package com.nardprinter.Bitmap;

import android.graphics.Bitmap;

public interface BitmapCallback {
    void finished(Bitmap bitmap);

    void error(Throwable error);
}
