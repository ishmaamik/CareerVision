import spacy
import re
from .skill_variants import field_skill_variants
import logging
from typing import List, Dict, Any, Set, Tuple
from difflib import SequenceMatcher
from spacy.language import Language
from .schema_models import JobRequirements, CVData, MatchResponse

# Configure logging
logger = logging.getLogger(__name__)


@Language.factory("skill_extractor")
def create_skill_extractor(nlp, name):
    return SkillExtractor()


class SkillExtractor:
    def __init__(self):
        pass

    def __call__(self, doc):
        return doc


class UniversalEngineeringMatcher:
    def __init__(self):
        # Load spaCy model
        try:
            self.nlp = spacy.load("en_core_web_sm")
            if "skill_extractor" not in self.nlp.pipe_names:
                self.nlp.add_pipe("skill_extractor", last=True)
        except OSError as e:
            logger.error(
                "SpaCy model 'en_core_web_sm' not found. Please download it using "
                "'python -m spacy download en_core_web_sm'"
            )
            raise
        except Exception as e:
            logger.error(f"Error initializing spaCy: {e}")
            raise

        # Universal engineering keywords applicable to ALL fields
        self.project_keywords = {
            'project', 'design', 'develop', 'developed', 'create', 'created', 'build', 'built',
            'implement', 'implemented', 'construct', 'constructed', 'engineer', 'engineered',
            'plan', 'planned', 'execute', 'executed', 'manage', 'managed', 'research',
            'analyze', 'analysis', 'solution', 'system', 'prototype', 'model', 'simulation',
            'optimization', 'optimize', 'improve', 'improved', 'innovate', 'innovative', 'collaborate',
            'testing', 'test', 'evaluate', 'assessment', 'study', 'investigation', 'deploy', 'deployed',
            'launch', 'launched', 'integrate', 'integrated', 'maintain', 'maintained'
        }

        # Professional experience indicators (universal)
        self.experience_keywords = {
            'experience', 'worked', 'work', 'intern', 'internship', 'job', 'position', 'role',
            'responsibility', 'duties', 'manage', 'managed', 'lead', 'led', 'coordinate',
            'coordinated', 'supervise', 'supervised', 'collaborate', 'collaborated', 'team',
            'professional', 'commercial', 'industry', 'company', 'organization', 'firm',
            'corporation', 'consultant', 'consulting', 'freelance', 'contract', 'full-time',
            'part-time', 'employment', 'career', 'years', 'months', 'duration', 'developer',
            'engineer', 'specialist', 'analyst'
        }

        # Achievement keywords (universal across all fields)
        self.achievement_keywords = {
            'award', 'awarded', 'winner', 'won', 'achievement', 'achieved', 'recognition',
            'recognized', 'certificate', 'certified', 'certification', 'competition', 'contest',
            'finalist', 'runner-up', 'top', 'rank', 'ranked', 'position', 'placed', 'prize',
            'honor', 'honored', 'excellence', 'outstanding', 'best', 'first', 'second', 'third',
            'scholarship', 'dean', 'merit', 'distinction', 'summa', 'magna', 'cum laude',
            'published', 'publication', 'paper', 'journal', 'conference', 'presentation',
            'patent', 'innovation', 'invention', 'hackathon', 'coding', 'programming'
        }

        # Education and qualification keywords
        self.education_keywords = {
            'bachelor', 'master', 'phd', 'doctorate', 'degree', 'diploma', 'certification',
            'course', 'training', 'workshop', 'seminar', 'conference', 'university', 'college',
            'institute', 'school', 'academy', 'gpa', 'cgpa', 'grade', 'score', 'thesis',
            'dissertation', 'research', 'coursework', 'curriculum', 'study', 'studied', 'graduate'
        }

        # Field-specific skill mappings for better recognition
        self.field_skill_variants = field_skill_variants
        
        # Enhanced skill relationships for better matching
        self.skill_relationships = {
            'node.js': ['express', 'expressjs', 'express.js', 'nodejs', 'node js', 'mern', 'mean'],
            'react': ['reactjs', 'react.js', 'jsx', 'mern'],
            'javascript': ['js', 'es6', 'es2015', 'ecmascript', 'node'],
            'mysql': ['sql', 'database', 'rdbms', 'relational database'],
            'mongodb': ['nosql', 'document database', 'mongo', 'mern', 'mean'],
            'git': ['github', 'gitlab', 'bitbucket', 'version control', 'vcs'],
            'tailwind css': ['tailwind', 'tailwindcss'],
            'autocad': ['cad', 'computer aided design', 'technical drawing', '2d', '3d'],
            'bill of quantities (boq)': ['boq', 'quantity surveying', 'estimation', 'cost estimation'],
            'project management': ['pm', 'planning', 'coordination', 'execution', 'delivery'],
            'quality control': ['qc', 'qa', 'quality assurance', 'testing', 'inspection']
        }

    def _identify_engineering_field(self, text: str) -> str:
        """Enhanced engineering field identification"""
        text_lower = text.lower()

        # Enhanced field indicators with more specific terms
        field_indicators = {
            'software': ['software', 'programming', 'coding', 'web', 'app', 'javascript', 'python', 
                        'java', 'react', 'database', 'frontend', 'backend', 'full-stack', 'mern', 
                        'api', 'framework', 'library', 'git', 'github', 'deployment'],
            'civil': ['civil', 'construction', 'building', 'structural', 'concrete', 'steel', 
                     'bridge', 'road', 'infrastructure', 'site', 'survey', 'boq', 'autocad', 
                     'project management', 'quantity surveying'],
            'mechanical': ['mechanical', 'manufacturing', 'machine', 'automotive', 'thermal', 
                          'fluid', 'hvac', 'cad', 'solidworks', 'design', 'production'],
            'electrical': ['electrical', 'electronics', 'power', 'circuit', 'embedded', 'signal', 
                          'control', 'automation', 'microcontroller', 'plc'],
            'chemical': ['chemical', 'process', 'petrochemical', 'pharmaceutical', 'refinery', 
                        'distillation', 'reactor', 'plant'],
            'industrial': ['industrial', 'operations', 'production', 'manufacturing', 'supply chain', 
                          'lean', 'six sigma', 'optimization'],
            'biomedical': ['biomedical', 'medical device', 'healthcare', 'biotechnology', 'clinical'],
            'aerospace': ['aerospace', 'aircraft', 'aviation', 'flight', 'satellite', 'rocket']
        }

        field_scores = {}
        for field, keywords in field_indicators.items():
            score = sum(1 for keyword in keywords if keyword in text_lower)
            # Weighted scoring for more specific terms
            if field == 'software':
                specific_terms = ['mern', 'full-stack', 'react', 'node.js', 'javascript']
                specific_score = sum(2 for term in specific_terms if term in text_lower)
                score += specific_score
            elif field == 'civil':
                specific_terms = ['boq', 'quantity surveying', 'site engineer', 'construction project']
                specific_score = sum(2 for term in specific_terms if term in text_lower)
                score += specific_score
            
            if score > 0:
                field_scores[field] = score

        return max(field_scores.items(), key=lambda x: x[1])[0] if field_scores else 'general'

    def _preprocess_text(self, text: str) -> spacy.tokens.Doc:
        """Enhanced text preprocessing preserving technical terms"""
        try:
            if not text or not isinstance(text, str):
                return self.nlp("")

            # Preserve case for certain technical terms before lowercasing
            protected_patterns = [
                (r'\bNode\.js\b', 'nodejs'),
                (r'\bReact\.js\b', 'reactjs'),
                (r'\bVue\.js\b', 'vuejs'),
                (r'\bNext\.js\b', 'nextjs'),
                (r'\bAngular\.js\b', 'angularjs'),
                (r'\bExpress\.js\b', 'expressjs'),
                (r'\bMERN\b', 'mern stack'),
                (r'\bMEAN\b', 'mean stack'),
                (r'\bBoQ\b', 'bill of quantities'),
                (r'\bCAD\b', 'computer aided design'),
                (r'\bAPI\b', 'application programming interface'),
                (r'\bUI/UX\b', 'user interface user experience'),
                (r'\bHTML/CSS\b', 'html css'),
                (r'\bES6\b', 'ecmascript 6'),
            ]
            
            # Apply protected patterns
            for pattern, replacement in protected_patterns:
                text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
            
            text = text.lower().strip()
            if not text:
                return self.nlp("")

            # Clean while preserving technical syntax
            text = re.sub(r'[^\w\s\+#@/\.-]', ' ', text)
            text = re.sub(r'\s+', ' ', text).strip()

            return self.nlp(text)
        except Exception as e:
            logger.error(f"Error preprocessing text: {e}")
            return self.nlp("")

    def _enhanced_skill_extraction(self, doc: spacy.tokens.Doc, job_skills: List[str]) -> Tuple[Set[str], Dict[str, float]]:
        """Enhanced skill matching with relationship awareness"""
        matched_skills = set()
        skill_confidence = {}

        if not job_skills:
            return matched_skills, skill_confidence

        # Ensure we have valid strings and convert to lowercase
        job_skills_lower = []
        for skill in job_skills:
            if isinstance(skill, str) and skill.strip():
                job_skills_lower.append(skill.lower().strip())

        if not job_skills_lower:
            return matched_skills, skill_confidence

        # Ensure we have valid text
        if not hasattr(doc, 'text') or not isinstance(doc.text, str):
            return matched_skills, skill_confidence
            
        text = doc.text.lower()

        for job_skill in job_skills_lower:
            confidence = 0.0

            try:
                # Exact match (highest confidence)
                if job_skill in text:
                    matched_skills.add(job_skill)
                    confidence = 1.0
                else:
                    # Check skill variants
                    skill_variants = self._generate_skill_variants(job_skill)
                    for variant in skill_variants:
                        if isinstance(variant, str) and variant in text:
                            matched_skills.add(job_skill)
                            confidence = max(confidence, 0.85)
                            break

                    # Check skill relationships (e.g., Express.js implies Node.js)
                    if confidence == 0 and job_skill in self.skill_relationships:
                        for related_skill in self.skill_relationships[job_skill]:
                            if isinstance(related_skill, str) and related_skill in text:
                                matched_skills.add(job_skill)
                                confidence = max(confidence, 0.75)  # Slightly lower confidence
                                break

                    # Enhanced fuzzy matching for typos/variations
                    if confidence == 0:
                        words = text.split()
                        for word in words:
                            if isinstance(word, str) and len(word) > 2:
                                try:
                                    similarity = SequenceMatcher(None, job_skill, word).ratio()
                                    if similarity > 0.8:
                                        matched_skills.add(job_skill)
                                        confidence = max(confidence, similarity * 0.7)
                                    # Also check partial matches for compound terms
                                    elif len(job_skill) > 5 and (job_skill in word or word in job_skill):
                                        if len(word) >= len(job_skill) * 0.6:  # At least 60% overlap
                                            matched_skills.add(job_skill)
                                            confidence = max(confidence, 0.6)
                                except Exception as e:
                                    logger.debug(f"Error in fuzzy matching for skill '{job_skill}' and word '{word}': {e}")
                                    continue
                
                if confidence > 0:
                    skill_confidence[job_skill] = confidence
                    
            except Exception as e:
                logger.error(f"Error processing skill '{job_skill}': {e}")
                continue
                
        return matched_skills, skill_confidence

    def _generate_skill_variants(self, skill: str) -> Set[str]:
        """Enhanced skill variant generation"""
        variants = {skill.lower()}
    
        # Field-specific known variants
        if skill.lower() in self.field_skill_variants:
            variants.update(v.lower() for v in self.field_skill_variants[skill.lower()])
    
        # Enhanced abbreviation generation
        words = skill.split()
        if len(words) > 1:
            # Standard abbreviation
            abbreviation = ''.join([w[0] for w in words if w[0].isalnum()])
            variants.add(abbreviation.lower())
            
            # Common technical abbreviations
            if 'javascript' in skill.lower():
                variants.update(['js', 'java script'])
            if 'cascading style sheets' in skill.lower() or skill.lower() == 'css':
                variants.add('css3')
            if 'hypertext markup language' in skill.lower() or skill.lower() == 'html':
                variants.add('html5')

        # Lemmatized forms
        doc = self.nlp(skill)
        lemmatized = " ".join([t.lemma_ for t in doc])
        variants.add(lemmatized.lower())
    
        # Handle plural/singular forms
        variants.update([w.rstrip('s') for w in variants if len(w) > 3])
        variants.update([w + 's' for w in variants if not w.endswith('s')])
        
        # Handle common technical suffixes
        base_variants = list(variants)
        for variant in base_variants:
            if not variant.endswith('.js') and 'js' in variant:
                variants.add(variant.replace('js', '.js'))
                variants.add(variant.replace('js', ' js'))

        return variants

    def _get_adaptive_weights(self, skill_percentage: float, engineering_field: str) -> Dict[str, float]:
        """Adaptive weighting based on skill match strength and field"""
        base_weights = {'skills': 0.45, 'keywords': 0.25, 'experience': 0.30}
        
        # Adjust weights based on skill match strength
        if skill_percentage >= 90:
            # Very strong skill match - reduce keyword dependency
            return {'skills': 0.55, 'keywords': 0.15, 'experience': 0.30}
        elif skill_percentage >= 70:
            # Good skill match - moderate keyword reduction
            return {'skills': 0.50, 'keywords': 0.20, 'experience': 0.30}
        elif skill_percentage >= 50:
            # Moderate skill match - slight keyword reduction
            return {'skills': 0.47, 'keywords': 0.23, 'experience': 0.30}
        else:
            # Low skill match - standard weights
            return base_weights

    def _calculate_keyword_relevance(self, job_doc: spacy.tokens.Doc, cv_doc: spacy.tokens.Doc, engineering_field: str) -> Dict[str, Any]:
        """Enhanced keyword matching with contextual awareness"""
        stop_words = self.nlp.Defaults.stop_words if hasattr(self.nlp, 'Defaults') else set()

        # Enhanced token extraction with part-of-speech filtering
        job_keywords = set()
        for token in job_doc:
            if (not token.is_punct and not token.is_space and
                token.lemma_.lower() not in stop_words and
                len(token.lemma_) > 2 and
                token.pos_ in ['NOUN', 'VERB', 'ADJ', 'PROPN', 'NUM'] and  # Added NUM for technical versions
                not token.is_stop):
                job_keywords.add(token.lemma_.lower())

        cv_keywords = set()
        for token in cv_doc:
            if (not token.is_punct and not token.is_space and
                token.lemma_.lower() not in stop_words and
                len(token.lemma_) > 2 and
                token.pos_ in ['NOUN', 'VERB', 'ADJ', 'PROPN', 'NUM'] and
                not token.is_stop):
                cv_keywords.add(token.lemma_.lower())

        # Enhanced phrase extraction
        job_phrases = set()
        cv_phrases = set()
        
        # Technical phrase patterns
        technical_patterns = [
            r'\b(?:full[- ]?stack|front[- ]?end|back[- ]?end)\b',
            r'\b(?:web|mobile|desktop)\s+(?:app|application|development)\b',
            r'\b(?:project|software|system)\s+(?:management|development|design)\b',
            r'\b(?:database|data)\s+(?:design|management|modeling)\b',
            r'\b(?:api|rest|graphql)\s+(?:development|integration)\b',
        ]
        
        for pattern in technical_patterns:
            job_matches = re.findall(pattern, job_doc.text.lower())
            cv_matches = re.findall(pattern, cv_doc.text.lower())
            job_phrases.update(job_matches)
            cv_phrases.update(cv_matches)

        # Standard noun chunks
        for chunk in job_doc.noun_chunks:
            if len(chunk.text.strip()) > 1 and not chunk.root.is_stop:
                job_phrases.add(chunk.text.lower().strip())
                
        for chunk in cv_doc.noun_chunks:
            if len(chunk.text.strip()) > 1 and not chunk.root.is_stop:
                cv_phrases.add(chunk.text.lower().strip())

        # Bigrams for technical terms
        def _technical_ngrams(doc, n=2):
            tokens = [t.text.lower() for t in doc if not t.is_punct and not t.is_space and not t.is_stop]
            ngrams = set()
            for i in range(len(tokens) - (n - 1)):
                ngram = " ".join(tokens[i:i+n])
                # Only include if contains technical indicators
                if any(tech in ngram for tech in ['web', 'app', 'data', 'system', 'project', 'software', 'development']):
                    ngrams.add(ngram)
            return ngrams

        job_bigrams = _technical_ngrams(job_doc, n=2)
        cv_bigrams = _technical_ngrams(cv_doc, n=2)
        job_phrases |= job_bigrams
        cv_phrases |= cv_bigrams

        # Match tokens and phrases
        token_matches = job_keywords.intersection(cv_keywords)
        phrase_matches = job_phrases.intersection(cv_phrases)

        # Weighted scoring - phrases count more than individual tokens
        phrase_weight = 2.0
        token_weight = 1.0
        
        weighted_matches = len(phrase_matches) * phrase_weight + len(token_matches) * token_weight
        total_possible = len(job_phrases) * phrase_weight + len(job_keywords) * token_weight
        
        combined_matches = set(token_matches) | set(phrase_matches)

        # Enhanced technical boost
        technical_boost = 0
        universal_tech_terms = {
            'design', 'develop', 'engineer', 'analyze', 'optimize', 'implement', 'research',
            'project', 'system', 'solution', 'process', 'method', 'technology', 'technical',
            'innovation', 'quality', 'safety', 'standard', 'specification', 'requirement',
            'testing', 'validation', 'simulation', 'modeling', 'calculation', 'measurement',
            'deployment', 'integration', 'architecture', 'framework', 'platform'
        }

        field_specific_terms = {
            'software': ['coding', 'programming', 'debugging', 'deployment', 'api', 'framework', 'library'],
            'civil': ['construction', 'structural', 'surveying', 'estimation', 'site', 'building'],
            'mechanical': ['manufacturing', 'assembly', 'maintenance', 'production', 'machining'],
            'electrical': ['circuit', 'power', 'control', 'automation', 'embedded', 'signal']
        }

        # Apply technical boost
        try:
            for match in combined_matches:
                if isinstance(match, str):
                    if match in universal_tech_terms:
                        technical_boost += 2
                    if engineering_field in field_specific_terms and match in field_specific_terms[engineering_field]:
                        technical_boost += 3
        except Exception as e:
            logger.error(f"Error applying technical boost: {e}")
            technical_boost = 0

        # Calculate percentage with improved denominator
        if total_possible > 0:
            base_percentage = (weighted_matches / total_possible) * 100
        else:
            base_percentage = 0
            
        adjusted_percentage = min(base_percentage + technical_boost, 100)

        return {
            'matched_keywords': list(combined_matches),
            'match_percentage': adjusted_percentage,
            'total_keywords': len(job_keywords),
            'total_phrases': len(job_phrases),
            'technical_boost': technical_boost,
            'engineering_field': engineering_field,
            'phrase_matches': len(phrase_matches),
            'token_matches': len(token_matches)
        }

    def _calculate_enhanced_experience_score(self, cv_doc: spacy.tokens.Doc, engineering_field: str) -> Dict[str, Any]:
        """Enhanced experience scoring with project quality assessment"""
        # Ensure we have valid text
        if not hasattr(cv_doc, 'text') or not isinstance(cv_doc.text, str):
            return {
                'project_mentions': 0,
                'experience_mentions': 0,
                'achievement_mentions': 0,
                'education_mentions': 0,
                'years_of_experience': 'Not specified',
                'total_score': 0,
                'engineering_field': engineering_field,
                'project_quality_score': 0,
                'breakdown': {
                    'projects': 0,
                    'professional_experience': 0,
                    'achievements': 0,
                    'education': 0,
                    'years_experience': 0,
                    'certifications': 0,
                    'publications': 0,
                    'field_specific': 0,
                    'project_quality': 0
                }
            }
            
        text = cv_doc.text.lower()
        
        # Count experience indicators with error handling
        try:
            project_mentions = sum(1 for keyword in self.project_keywords if isinstance(keyword, str) and keyword in text)
            experience_mentions = sum(1 for keyword in self.experience_keywords if isinstance(keyword, str) and keyword in text)
            achievement_mentions = sum(1 for keyword in self.achievement_keywords if isinstance(keyword, str) and keyword in text)
            education_mentions = sum(1 for keyword in self.education_keywords if isinstance(keyword, str) and keyword in text)
        except Exception as e:
            logger.error(f"Error counting keyword mentions: {e}")
            project_mentions = experience_mentions = achievement_mentions = education_mentions = 0
        
        # Enhanced project scoring with quality indicators
        project_quality_indicators = {
            'deployment': ['deployed', 'live', 'production', 'hosted', 'published'],
            'collaboration': ['github', 'git', 'team', 'collaboration', 'open source'],
            'scale': ['users', 'scalable', 'performance', 'optimization', 'large scale'],
            'modern_tech': ['react', 'node', 'mongodb', 'api', 'responsive', 'mobile'],
            'completion': ['completed', 'finished', 'delivered', 'successful', 'launched']
        }
        
        project_quality_score = 0
        try:
            for category, indicators in project_quality_indicators.items():
                if any(isinstance(indicator, str) and indicator in text for indicator in indicators):
                    project_quality_score += 3
        except Exception as e:
            logger.error(f"Error calculating project quality score: {e}")
            project_quality_score = 0

        # Dynamic scoring based on field
        try:
            if engineering_field == 'software':
                project_score = min((project_mentions * 2) + (project_quality_score * 0.5), 30)
                experience_score = min(experience_mentions * 1.5, 15)
            elif engineering_field == 'civil':
                project_score = min((project_mentions * 2) + (project_quality_score * 0.3), 25)
                experience_score = min(experience_mentions * 2, 20)
            else:
                project_score = min((project_mentions * 2) + (project_quality_score * 0.4), 25)
                experience_score = min(experience_mentions * 1.5, 20)
            
            achievement_score = min(achievement_mentions * 2.5, 15)  # Reduced multiplier but kept important
            education_score = min(education_mentions * 1.2, 12)
        except Exception as e:
            logger.error(f"Error calculating base scores: {e}")
            project_score = experience_score = achievement_score = education_score = 0
        
        # Years of experience (enhanced pattern matching)
        year_patterns = [
            r'(\d+)\s*(?:year|yr)s?\s*(?:of\s*)?(?:experience|exp)',
            r'(\d+)\+\s*(?:year|yr)s?\s*(?:experience|exp)?',
            r'(?:over|more than)\s*(\d+)\s*(?:year|yr)s?'
        ]
        
        years_score = 0
        years_found = None
        try:
            for pattern in year_patterns:
                years_match = re.search(pattern, text)
                if years_match:
                    years = int(years_match.group(1))
                    years_score = min(years * 2.5, 15)  # More generous scoring
                    years_found = str(years)
                    break
        except Exception as e:
            logger.error(f"Error extracting years of experience: {e}")
            years_score = 0
            years_found = None
        
        # Professional indicators
        try:
            cert_score = 6 if any(isinstance(cert, str) and cert in text for cert in ['certified', 'certification', 'license', 'licensed']) else 0
            publication_score = 8 if any(isinstance(pub, str) and pub in text for pub in ['published', 'publication', 'paper', 'journal']) else 0
        except Exception as e:
            logger.error(f"Error calculating professional indicators: {e}")
            cert_score = publication_score = 0
        
        # Enhanced field-specific bonuses
        field_specific_score = 0
        try:
            if engineering_field == 'software':
                software_indicators = ['github', 'hackathon', 'open source', 'portfolio', 'deployed', 'full-stack', 'mern', 'api']
                field_specific_score = min(sum(2 for term in software_indicators if isinstance(term, str) and term in text), 10)
            elif engineering_field == 'civil':
                civil_indicators = ['site', 'construction', 'survey', 'inspection', 'boq', 'project management', 'autocad']
                field_specific_score = min(sum(2 for term in civil_indicators if isinstance(term, str) and term in text), 10)
            elif engineering_field == 'mechanical':
                mech_indicators = ['manufacturing', 'production', 'assembly', 'maintenance', 'cad', 'design']
                field_specific_score = min(sum(2 for term in mech_indicators if isinstance(term, str) and term in text), 10)
        except Exception as e:
            logger.error(f"Error calculating field-specific score: {e}")
            field_specific_score = 0
        
        total_experience_score = min(
            project_score + experience_score + achievement_score + education_score + 
            years_score + cert_score + publication_score + field_specific_score,
            50  # Cap at 50%
        )
        
        return {
            'project_mentions': project_mentions,
            'experience_mentions': experience_mentions,
            'achievement_mentions': achievement_mentions,
            'education_mentions': education_mentions,
            'years_of_experience': years_found or 'Not specified',
            'total_score': total_experience_score,
            'engineering_field': engineering_field,
            'project_quality_score': project_quality_score,
            'breakdown': {
                'projects': project_score,
                'professional_experience': experience_score,
                'achievements': achievement_score,
                'education': education_score,
                'years_experience': years_score,
                'certifications': cert_score,
                'publications': publication_score,
                'field_specific': field_specific_score,
                'project_quality': project_quality_score * 0.5
            }
        }

    def calculate_universal_match(self, job: JobRequirements, cv: CVData) -> MatchResponse:
        """Enhanced universal matching algorithm"""
        try:
            # Input validation
            if not isinstance(job, JobRequirements) or not isinstance(cv, CVData):
                raise ValueError("Invalid input types")
                
            if not hasattr(cv, 'extracted_text') or not cv.extracted_text or not isinstance(cv.extracted_text, str):
                raise ValueError("CV text cannot be empty or must be a string")

            # Preprocess texts with better error handling
            try:
                job_text = f"{job.title or ''} {job.description or ''} {job.responsibilities or ''} {job.qualifications or ''}"
                job_doc = self._preprocess_text(job_text)
                cv_doc = self._preprocess_text(cv.extracted_text)
            except Exception as e:
                logger.error(f"Error in text preprocessing: {e}")
                raise ValueError(f"Text preprocessing failed: {e}")
            
            # Identify engineering field
            try:
                engineering_field = self._identify_engineering_field(job_text + " " + cv.extracted_text)
            except Exception as e:
                logger.error(f"Error identifying engineering field: {e}")
                engineering_field = 'general'

            # Enhanced skill matching with error handling
            try:
                job_skills = []
                if hasattr(job, 'skills') and job.skills:
                    job_skills = [skill.strip() for skill in job.skills if isinstance(skill, str) and skill.strip()]
                
                matched_skills, skill_confidence = self._enhanced_skill_extraction(cv_doc, job_skills)
                
                missing_skills = [
                    skill for skill in job_skills
                    if skill.lower() not in {s.lower() for s in matched_skills}
                ]
            except Exception as e:
                logger.error(f"Error in skill extraction: {e}")
                matched_skills, skill_confidence = set(), {}
                missing_skills = job.skills or []
            
            # Calculate weighted skill score with confidence
            try:
                if job_skills:
                    skill_match_percentage = (len(matched_skills) / len(job_skills)) * 100
                    if skill_confidence:
                        # Weight by confidence scores
                        weighted_skill_score = sum(skill_confidence.values()) / len(job_skills) * 100
                        skill_match_percentage = max(skill_match_percentage, weighted_skill_score)
                else:
                    skill_match_percentage = 0
            except Exception as e:
                logger.error(f"Error calculating skill match percentage: {e}")
                skill_match_percentage = 0

            # Get adaptive weights
            try:
                weights = self._get_adaptive_weights(skill_match_percentage, engineering_field)
            except Exception as e:
                logger.error(f"Error getting adaptive weights: {e}")
                weights = {'skills': 0.45, 'keywords': 0.25, 'experience': 0.30}

            # Enhanced keyword matching
            try:
                keyword_analysis = self._calculate_keyword_relevance(job_doc, cv_doc, engineering_field)
            except Exception as e:
                logger.error(f"Error in keyword analysis: {e}")
                keyword_analysis = {
                    'matched_keywords': [],
                    'match_percentage': 0,
                    'total_keywords': 0,
                    'total_phrases': 0,
                    'technical_boost': 0,
                    'engineering_field': engineering_field,
                    'phrase_matches': 0,
                    'token_matches': 0
                }
            
            # Enhanced experience scoring
            try:
                experience_analysis = self._calculate_enhanced_experience_score(cv_doc, engineering_field)
            except Exception as e:
                logger.error(f"Error in experience analysis: {e}")
                experience_analysis = {
                    'project_mentions': 0,
                    'experience_mentions': 0,
                    'achievement_mentions': 0,
                    'education_mentions': 0,
                    'years_of_experience': 'Not specified',
                    'total_score': 0,
                    'engineering_field': engineering_field,
                    'project_quality_score': 0,
                    'breakdown': {}
                }

            # Final calculation with adaptive weighting
            try:
                final_match_percentage = (
                    skill_match_percentage * weights['skills'] +
                    keyword_analysis['match_percentage'] * weights['keywords'] +
                    experience_analysis['total_score'] * weights['experience']
                )
            except Exception as e:
                logger.error(f"Error in final calculation: {e}")
                final_match_percentage = 0
            
            # Enhanced bonuses
            bonuses_applied = {}
            try:
                # Skill match bonus (more generous)
                if skill_match_percentage >= 85:
                    final_match_percentage = min(final_match_percentage + 7, 100)
                    bonuses_applied['excellent_skill_match'] = True
                elif skill_match_percentage >= 70:
                    final_match_percentage = min(final_match_percentage + 4, 100)
                    bonuses_applied['good_skill_match'] = True
                
                # Experience bonus
                if experience_analysis['total_score'] >= 35:
                    final_match_percentage = min(final_match_percentage + 5, 100)
                    bonuses_applied['exceptional_experience'] = True
                elif experience_analysis['total_score'] >= 25:
                    final_match_percentage = min(final_match_percentage + 3, 100)
                    bonuses_applied['good_experience'] = True
                
                # Field-specific bonuses
                if engineering_field == 'software':
                    cv_text_lower = cv.extracted_text.lower()
                    if any(isinstance(term, str) and term in cv_text_lower for term in ['full-stack', 'mern', 'deployed', 'github']):
                        final_match_percentage = min(final_match_percentage + 3, 100)
                        bonuses_applied['software_portfolio_bonus'] = True
            except Exception as e:
                logger.error(f"Error applying bonuses: {e}")
            
            final_match_percentage = max(0, min(round(final_match_percentage, 2), 100))

            # Create comprehensive response
            return MatchResponse(
                match_percentage=final_match_percentage,
                matched_skills=list(matched_skills),
                missing_skills=missing_skills,
                skill_match_percentage=round(skill_match_percentage, 2),
                keyword_match_percentage=round(keyword_analysis['match_percentage'], 2),
                experience_score=round(experience_analysis['total_score'], 2),
                engineering_field=engineering_field,
                weights_used=weights,
                bonuses_applied=bonuses_applied,
                skill_confidence=skill_confidence,
                detailed_analysis={
                    'keyword_analysis': keyword_analysis,
                    'experience_analysis': experience_analysis,
                    'total_job_skills': len(job_skills) if job_skills else 0,
                    'matched_skill_count': len(matched_skills),
                    'processing_details': {
                        'job_text_length': len(job_text) if isinstance(job_text, str) else 0,
                        'cv_text_length': len(cv.extracted_text) if isinstance(cv.extracted_text, str) else 0,
                        'preprocessing_successful': True
                    }
                }
            )

        except Exception as e:
            logger.error(f"Error in calculate_universal_match: {e}", exc_info=True)
            # Return a fallback response
            return MatchResponse(
                match_percentage=0.0,
                matched_skills=[],
                missing_skills=job.skills or [] if hasattr(job, 'skills') else [],
                skill_match_percentage=0.0,
                keyword_match_percentage=0.0,
                experience_score=0.0,
                engineering_field='unknown',
                weights_used={'skills': 0.45, 'keywords': 0.25, 'experience': 0.30},
                bonuses_applied={},
                skill_confidence={},
                detailed_analysis={
                    'error': str(e),
                    'processing_details': {
                        'preprocessing_successful': False
                    }
                },
                recommendations=['Please check CV format and content', 'Ensure all required fields are present']
            )

    