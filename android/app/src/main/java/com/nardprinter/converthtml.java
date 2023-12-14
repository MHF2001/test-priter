package com.nardprinter;

import static android.content.ContentValues.TAG;
import static com.nardprinter.ThermalPrinterModule.context;

import android.app.Service;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.IBinder;
import android.util.Base64;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.Nullable;

import com.dantsu.escposprinter.connection.tcp.TcpConnection;
import com.facebook.react.bridge.ReactApplicationContext;
import com.nardprinter.Bitmap.BitmapGeneratingAsyncTask;

import java.io.ByteArrayOutputStream;

public class converthtml extends Service implements BitmapGeneratingAsyncTask.Callback {
    String html, ipAddress;

    double port, timeout;
    boolean autoCut, openCashbox;
    double mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine;
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent, flags, startId);
        try {
            TcpConnection connection = new TcpConnection(ipAddress, (int) port, (int) timeout);
            Log.d(TAG, "onStartCommand: "+connection.isConnected());
            if (intent.getExtras() != null) {
                if (intent.getExtras().containsKey("html")) {
                    html = intent.getStringExtra("html");
                    ipAddress = intent.getStringExtra("ipAddress");
                    port = intent.getDoubleExtra("port", port);
                    timeout = intent.getDoubleExtra("timeout", 9100);
                    autoCut = intent.getBooleanExtra("autoCut", false);
                    openCashbox = intent.getBooleanExtra("openCashbox", false);
                    mmFeedPaper = intent.getDoubleExtra("mmFeedPaper", 0);
                    printerDpi = intent.getDoubleExtra("printerDpi", 0);
                    printerWidthMM = intent.getDoubleExtra("printerWidthMM", 0);
                    printerNbrCharactersPerLine = intent.getDoubleExtra("printerNbrCharactersPerLine", 0);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            WebView wv = new WebView(this);
            WebSettings setting = wv.getSettings();
            setting.setBuiltInZoomControls(true);
            setting.setUseWideViewPort(false);
            setting.setJavaScriptEnabled(true);
            setting.setSupportMultipleWindows(false);
            setting.setLoadsImagesAutomatically(true);
            setting.setDomStorageEnabled(true);
            setting.setLoadWithOverviewMode(true);
            final String RESULTDATA = html;
            if (html.length() > 3) {
                wv.loadData(RESULTDATA, "text/html", null);
//                new BitmapGeneratingAsyncTask(this, html, 576).execute();
            }
        } catch (Exception e) {
            e.printStackTrace();
            try {
                stopService(intent);

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return START_STICKY;
    }
    @Override
    public void done(Bitmap bitmap) {
        Log.d("Test", "done: " + bitmap);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream .toByteArray();

        String encoded = Base64.encodeToString(byteArray, Base64.DEFAULT);
        ReactApplicationContext ReactApplicationContext = context;
        ThermalPrinterModule thermalPrinterModule = new ThermalPrinterModule(context);

            TcpConnection connection = new TcpConnection(ipAddress, (int) port, (int) timeout);


//            Log.d(TAG, "done: "+connection.connect());
              thermalPrinterModule.printHTML("we are in converthtml" , autoCut, openCashbox,  mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine, ipAddress, (int) port, (int) timeout);
          // thermalPrinterModule.printIt(connection, "encoded", autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine);

//        printIt2(connection, bitmap, autoCut, openCashbox, 20, 203, 80, 42);



    }

}
