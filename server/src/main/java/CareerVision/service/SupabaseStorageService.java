package CareerVision.service;

import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class SupabaseStorageService {

    private static final String SUPABASE_URL = "https://wihilagxssyyodpuooxo.supabase.co";
    private static final String SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpaGlsYWd4c3N5eW9kcHVvb3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTU1MjksImV4cCI6MjA2ODI5MTUyOX0.On1o9qVHUF9omIuZM_KE9kXtvgbuZJOyXNNvExcwwlw";
    private static final String BUCKET_NAME = "cv-uploads";
    private static final OkHttpClient client = new OkHttpClient();

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
}