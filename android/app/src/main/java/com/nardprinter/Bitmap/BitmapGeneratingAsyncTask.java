package com.nardprinter.Bitmap;

import android.content.Context;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.webkit.WebView;

import com.nardprinter.Bitmap.content.WebViewContent;

import java.lang.ref.WeakReference;

public class BitmapGeneratingAsyncTask extends AsyncTask<Void, Void, Bitmap> {

    private final WeakReference<Context> context;
    private final String html;
    private final int width;
    private final WeakReference<Callback> callback;

    public BitmapGeneratingAsyncTask(Context context, String html, int width, Callback callback) {
        this.context = new WeakReference<>(context.getApplicationContext());
        this.html = html;
        this.width = width;
        this.callback = new WeakReference<>(callback);
    }

    @Override
    protected Bitmap doInBackground(Void... voids) {
        Context context = this.context.get();
        try {
            Html2BitmapConfigurator html2BitmapConfigurator = new Html2BitmapConfigurator() {
                @Override
                public void configureWebView(WebView webview) {
                }
            };

            Html2Bitmap build = new Html2Bitmap.Builder()
                    .setContext(context)
                    .setContent(WebViewContent.html(html))
                    .setBitmapWidth(width)
                    .setMeasureDelay(100)
                    .setScreenshotDelay(100)
                    .setStrictMode(false)
                    .setTimeout(20)
                    .build();

            return build.getBitmap();
        } catch (Exception e) {
            e.printStackTrace();

        }
        return null;
    }

    @Override
    protected void onPostExecute(Bitmap bitmap) {
        Callback bitmapCallback = this.callback.get();
        if (bitmapCallback != null) {
            bitmapCallback.done(bitmap);
        }
    }

    public interface Callback {
        void done(Bitmap bitmap);
    }
}
