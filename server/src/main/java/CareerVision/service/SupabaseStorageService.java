package CareerVision.service;

import okhttp3.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class SupabaseStorageService {

    private static final String SUPABASE_URL = "https://juxybcuqphaltrnvbyvq.supabase.co";
    private static final String SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eHliY3VxcGhhbHRybnZieXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODQwNTYsImV4cCI6MjA2OTU2MDA1Nn0.qGKD3KgcqkRbDG1bC5QsuLGE4vluzAcO7e6u5rtlSSw";
    private static final String BUCKET_NAME = "cv-uploads";
    private static final OkHttpClient client = new OkHttpClient();


    private static final String PROFILE_PICTURE_BUCKET = "profile-image-uploads";

    public String uploadProfilePicture(byte[] fileBytes, String fileName, String contentType) throws IOException {
        // Validate file type
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("Only image files are allowed");
        }

        // Create request body
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart(
                        "file",
                        fileName,
                        RequestBody.create(fileBytes, MediaType.parse(contentType)))
                .build();

        // Build request to upload file
        Request uploadRequest = new Request.Builder()
                .url(SUPABASE_URL + "/storage/v1/object/" + PROFILE_PICTURE_BUCKET + "/" + fileName)
                .header("apikey", SUPABASE_ANON_KEY)
                .header("Authorization", "Bearer " + SUPABASE_ANON_KEY)
                .header("Content-Type", contentType)
                .header("x-upsert", "true")  // Allow overwriting existing files
                .post(requestBody)
                .build();

        // Execute upload request
        try (Response uploadResponse = client.newCall(uploadRequest).execute()) {
            if (!uploadResponse.isSuccessful()) {
                String errorBody = uploadResponse.body() != null ? uploadResponse.body().string() : "No error details";
                throw new IOException("Supabase upload error: " + uploadResponse.code() + " - " + errorBody);
            }

            // Construct fully qualified public URL with signed URL for direct access
            String publicUrl = SUPABASE_URL + "/storage/v1/object/public/" + PROFILE_PICTURE_BUCKET + "/" + fileName;
            
            // Generate signed URL with extended expiration
            String signedUrl = generateSignedUrl(PROFILE_PICTURE_BUCKET, fileName);
            
            // Log successful upload
            System.out.println("Profile picture uploaded successfully:");
            System.out.println("Public URL: " + publicUrl);
            System.out.println("Signed URL: " + signedUrl);
            
            return signedUrl;  // Return signed URL for better accessibility
        }
    }

    private String generateSignedUrl(String bucket, String fileName) throws IOException {
        // Create a signed URL request
        Request signedUrlRequest = new Request.Builder()
                .url(SUPABASE_URL + "/storage/v1/object/sign/" + bucket + "/" + fileName)
                .header("apikey", SUPABASE_ANON_KEY)
                .header("Authorization", "Bearer " + SUPABASE_ANON_KEY)
                .get()
                .build();

        try (Response signedUrlResponse = client.newCall(signedUrlRequest).execute()) {
            if (!signedUrlResponse.isSuccessful()) {
                String errorBody = signedUrlResponse.body() != null ? signedUrlResponse.body().string() : "No error details";
                throw new IOException("Supabase signed URL error: " + signedUrlResponse.code() + " - " + errorBody);
            }

            // Parse the signed URL from the response
            String responseBody = signedUrlResponse.body().string();
            JSONObject jsonResponse = new JSONObject(responseBody);
            
            return jsonResponse.getString("signedURL");
        }
    }

    public void deleteProfilePicture(String fileName) throws IOException {
        // Build delete request
        Request request = new Request.Builder()
                .url(SUPABASE_URL + "/storage/v1/object/" + PROFILE_PICTURE_BUCKET + "/" + fileName)
                .header("apikey", SUPABASE_ANON_KEY)
                .header("Authorization", "Bearer " + SUPABASE_ANON_KEY)
                .delete()
                .build();

        // Execute request
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body() != null ? response.body().string() : "No error details";
                throw new IOException("Supabase delete error: " + response.code() + " - " + errorBody);
            }
            
            System.out.println("Profile picture deleted successfully: " + fileName);
        }
    }


    public static String uploadFile(byte[] fileBytes, String fileName, String contentType) throws IOException {
        // Validate file type
        if (!"application/pdf".equals(contentType)) {
            throw new IOException("Only PDF files are allowed");
        }

        // Create request body
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart(
                        "file",
                        fileName,
                        RequestBody.create(fileBytes, MediaType.parse(contentType))
                )
                .build();

        // Build request
        Request request = new Request.Builder()
                .url(SUPABASE_URL + "/storage/v1/object/" + BUCKET_NAME + "/" + fileName)
                .header("apikey", SUPABASE_ANON_KEY)
                .header("Authorization", "Bearer " + SUPABASE_ANON_KEY)
                .post(requestBody)
                .build();

        // Execute request
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body() != null ? response.body().string() : "No error details";
                throw new IOException("Supabase error: " + response.code() + " - " + errorBody);
            }

            // Parse response
            JSONObject jsonResponse = new JSONObject(response.body().string());
            return SUPABASE_URL + "/storage/v1/object/public/" + BUCKET_NAME + "/" + fileName;
        }
    }

    public static void deleteFile(String fileName) throws IOException {
        Request request = new Request.Builder()
                .url(SUPABASE_URL + "/storage/v1/object/" + BUCKET_NAME + "/" + fileName)
                .header("apikey", SUPABASE_ANON_KEY)
                .header("Authorization", "Bearer " + SUPABASE_ANON_KEY)
                .delete()
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Failed to delete file: " + response.message());
            }
        }
    }
}