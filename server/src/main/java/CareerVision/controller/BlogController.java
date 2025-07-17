package CareerVision.controller;

import CareerVision.model.Blog;
import CareerVision.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    private final BlogRepository blogRepository;

    @Autowired
    public BlogController(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @PostMapping("/blog")
    public Blog createBlog(@RequestBody Blog blog) {
        return blogRepository.save(blog);
    }

    @GetMapping("/all")
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @GetMapping("/:id")
    public Blog getBlog(@PathVariable Long id) {
        return blogRepository.getOne(id);
    }

}
