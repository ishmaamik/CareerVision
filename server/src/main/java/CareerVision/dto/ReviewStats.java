package CareerVision.dto;

public class ReviewStats {
    private double averageRating;
    private long totalReviews;
    private long jobId;

    // Constructors
    public ReviewStats() {}

    public ReviewStats(double averageRating, long totalReviews) {
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
    }

    public ReviewStats(double averageRating, long totalReviews, long jobId) {
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
        this.jobId = jobId;
    }

    // Getters and Setters
    public double getAverageRating() { return averageRating; }
    public void setAverageRating(double averageRating) { this.averageRating = averageRating; }

    public long getTotalReviews() { return totalReviews; }
    public void setTotalReviews(long totalReviews) { this.totalReviews = totalReviews; }

    public long getJobId() { return jobId; }
    public void setJobId(long jobId) { this.jobId = jobId; }
}
