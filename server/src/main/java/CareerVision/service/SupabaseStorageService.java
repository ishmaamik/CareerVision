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

    private String generatePublicUrl(String bucket, String fileName) {
        // Ensure consistent URL formatting
        String cleanFileName = fileName.startsWith("/") ? fileName.substring(1) : fileName;
        String publicUrl = SUPABASE_URL + "/storage/v1/object/public/" + bucket + "/" + cleanFileName;
        
        System.out.println("Generated Public URL Details:");
        System.out.println("Base URL: " + SUPABASE_URL);
        System.out.println("Bucket: " + bucket);
        System.out.println("Original Filename: " + fileName);
        System.out.println("Clean Filename: " + cleanFileName);
        System.out.println("Full Public URL: " + publicUrl);
        
        return publicUrl;
    }

    public static String uploadProfilePicture(byte[] fileBytes, String fileName, String contentType) throws IOException {
        // Validate file type
        if (!contentType.startsWith("image/")) {
            throw new IOException("Only image files are allowed");
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
        // Build request with double slash
        String uploadUrl = SUPABASE_URL + "/storage/v1/object/" + PROFILE_PICTURE_BUCKET + "//" + fileName;
        Request request = new Request.Builder()
                .url(uploadUrl)
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
            String publicUrl = SUPABASE_URL + "/storage/v1/object/public/" + PROFILE_PICTURE_BUCKET + "//" + fileName;
            return publicUrl;
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

    public static void deleteProfilePicture(String fileName) throws IOException {
        String deleteUrl = SUPABASE_URL + "/storage/v1/object/" + PROFILE_PICTURE_BUCKET + "//" + fileName;
        Request request = new Request.Builder()
                .url(deleteUrl)
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
        String uploadUrl = SUPABASE_URL + "/storage/v1/object/" + BUCKET_NAME + "/" + fileName;
        uploadUrl = uploadUrl.replaceAll("/+/", "/").replace("https:/", "https://");
        Request request = new Request.Builder()
                .url(uploadUrl)
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
            String publicUrl = SUPABASE_URL + "/storage/v1/object/public/" + BUCKET_NAME + "/" + fileName;
            publicUrl = publicUrl.replaceAll("/+/", "/").replace("https:/", "https://");
            return publicUrl;
        }
    }

    public static void deleteFile(String fileName) throws IOException {
        String deleteUrl = SUPABASE_URL + "/storage/v1/object/" + BUCKET_NAME + "/" + fileName;
        deleteUrl = deleteUrl.replaceAll("/+/", "/").replace("https:/", "https://");
        Request request = new Request.Builder()
                .url(deleteUrl)
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