package com.nardprinter;

import static android.content.ContentValues.TAG;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.bumptech.glide.Glide;
import com.dantsu.escposprinter.EscPosPrinter;
import com.dantsu.escposprinter.connection.DeviceConnection;
import com.dantsu.escposprinter.connection.bluetooth.BluetoothConnection;
import com.dantsu.escposprinter.connection.bluetooth.BluetoothPrintersConnections;
import com.dantsu.escposprinter.connection.tcp.TcpConnection;
import com.dantsu.escposprinter.exceptions.EscPosBarcodeException;
import com.dantsu.escposprinter.exceptions.EscPosConnectionException;
import com.dantsu.escposprinter.exceptions.EscPosEncodingException;
import com.dantsu.escposprinter.exceptions.EscPosParserException;
import com.dantsu.escposprinter.textparser.PrinterTextParserImg;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ReactModule(name = ThermalPrinterModule.NAME)
public class ThermalPrinterModule extends ReactContextBaseJavaModule {
  private static final String LOG_TAG = "RN_Thermal_Printer";
  public static final String NAME = "ThermalPrinterModule";
  private Promise jsPromise;
  private ArrayList<BluetoothConnection> btDevicesList = new ArrayList();

  static ReactApplicationContext context;
  public ThermalPrinterModule(ReactApplicationContext reactContext) {
    super(reactContext);
  context = reactContext;
  }


  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
  String payload;
  TcpConnection connection;
  ThermalPrinterModule cc;
  @ReactMethod
  public void printTcp(String ipAddress, double port, String payload, boolean autoCut, boolean openCashbox, double mmFeedPaper, double printerDpi, double printerWidthMM, double printerNbrCharactersPerLine, double timeout, Promise promise) {
  //  converthtml convertHtmlService = new converthtml();


//
//        05-05-2021
//        https://reactnative.dev/docs/native-modules-android
//        The following types are currently supported but will not be supported in TurboModules. Please avoid using them:
//
//        Integer -> ?number
//        int -> number
//        Float -> ?number
//        float -> number
//
 //   this.jsPromise = promise;
    try {
      String html="<html dir=\"ltr\" lang=\"en\"><head><meta charset=\"UTF-8\"><style>.invoice-body{width:93%;display: table;margin: 0 auto; padding:5px;}</style><style>.custom-center{display: flex !important;justify-content: center !important;align-items: center !important;}</style><style>p{margin:0}</style></head><body class=\"invoice-body\"><div style=\"text-align:center;margin:0;padding:0;\"><img src=\"data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEgASADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+R/wBqo+MvB3i6DVtG8T6/baHqo+SGDUZkSCZQNyBQ2ACMMPq2Olcz+zz8WNes/iZp9n4m1/U9R0zUv9CK313JMsUjEeW43E4O4Bc+jGvrD4r+DYPHngXUtCmKpNKvmW0rD/VTLyjfTPB9ia/OO8trrS9SmtrmOS2vbWUxyIflaORTgj2IIoA/Uqviz9pX4qa5J8S7rTPDGu6np1hpSi1cWN28IlmBzIW2kZIJ289Np9a940v4rwv+z/8A8JxOyNewWZikjP8AFeA+WFx6M+D/ALpzXwtY2l/4h12G1tlku9T1C4CKM5aSR27n3J60AfRv7K6+MvGPiqbWNa8T+ILjQtL4aKbUZnS4mI+VCC2CAPmI/wB0d66/46ftCR+Fb640DwakF3q8JKXN3IN0Vs3Qoo/icd88A8cnIGv40kh+Bn7Pq2GkSbdTdRaR3CcF7qUEvLzzwA5HptUV8QxpLdXKogeWeZwAOrOxP6kmgDrr/wCKXjy+unuJ/GGurI3UQXskKfgqEKPwFQL8SPHCsGHjLxJkHPOpzEflur7U+DXwe0PwJoFs95Y2154hljDXV3MgkKMRykefuqOmRyep7AdF8Qfhv4b8c6RPZ6vp0C3DKRFexRhZoW7MrdevODwe9AHzf8I/2ldUsb6303x+4vdNc7f7RWPE0PoWCjDr64G7vz0r69tbiG7tYbm1lSa3mQSRyIcq6kZBB7gg1+ZXjPw9d+E/FOp6FqODc2MxiZgMBx1Vh7MpBHsa+rf2NPGc2q+GdR8MX0jSS6Uwmtixz+4cnK/8BYfkw9KAPP8A9qPxj4m0X4s3Nno/iPWdPtBawMILW+liQErydqsBk11/7HPibXtf1PxQmva3qeprDDAYxe3ckwQlnzt3E4zgdPSvMv2u/wDks13/ANedv/6DXbfsO/8AIW8W/wDXC2/9CkoA+ta+a/2yvEeueH/+EQ/sHWdS0zz/ALZ5v2K6eHzNvkbd20jOMnGemTX0pXyr+3P/AMyT/wBv3/tvQByn7MnjPxRrPxf0uy1fxJrV/ZvDOWgur6WWNiImIyrMQcGvYf2uPEms+GvBOkT6Bqd3p009/wCVJJbSFGZfLc4yOeoFeAfsnf8AJbdI/wCuFx/6Kavaf22v+RC0H/sJ/wDtJ6APmD/hY/jj/ocvEn/g0n/+Ko/4WP44/wChy8Sf+DSf/wCKq18FVV/i14RV1DKdShBBGQfmFfopqmmWGrWj2uqWVteWzgq0VxEsikHqMEUAfCPgn4/+OvDV3EbvU31qxB/eW2oHeWHtJ98H8SPUGvtf4f8Ai/TfHPhWz13R2byJwQ8b43wuPvI2O4/UYPevgT41eHLHwn8UfEGjaSf9Bt5laJd27Yrxq+zP+zu2/hX0J+w/PM3h7xTbsW+zx3UMiDsGZGDfoq/pQB9M0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXxz+2H4A/srxDb+L9OhIs9TIivNo4juAOG9t6j81PrX2NXBfHmzt774PeK0u4VlWOxeZA38LoNysPcEA0AfAUfiXUo/CE3hpZyNKlvFvmj/6aKhT8iCOPVR6V9E/scfD7zrm48b6lEPLh3W2nBh1fGJJB9Adg+relfLlfpf8ADK1gsvh14ZgtYlihXTbchVGBkxqSfxJJ/GgDwP8Abju3TTvCFmM+XLLdTNzxlBEB/wCjDXg/wLskv/i/4SglUMov45cE45T5x+q19C/tu6TJceF/DerIm6Ozu5bdyM/L5qAj8P3X8vWvmX4Z63F4c+IPh7V7k4t7S+ikmPpHuAc/98k0AfpdRSIyuiujBlYZBByCKWgD4h/bKsorX4twTRDD3elwzSe7B5I/5ItM/Y5uXg+LrxKX23GnTIwHThkbn/vmsr9qnxBFr3xh1BLdxJDpsMdgrA8ZXLOPwd2H4V1f7FOkSXPjzWdWw3kWVh5JIHG+V1K/pG9AHP8A7Xf/ACWa7/687f8A9Brtv2Hf+Qt4t/64W3/oUlch+2HbPB8YDK4O240+CROOwLL/ADU10X7Ed6sfi/xFZF1DT2KShT1OyTH/ALPQB9hV8q/tz/8AMk/9v3/tvX1VXyT+3FfJJrHhKwBXzIILicjuBIyKP/RZ/WgDgv2Tv+S26R/1wuP/AEU1e0/ttf8AIhaD/wBhP/2k9eO/sjWzz/GeykQErb2lxK+BnAKbefTlhXsX7bX/ACIWg/8AYT/9pPQB8oeCdd/4RjxdpGufZvtX9n3KXHkb9nmbTnG7Bx9cGvf9a/ay1S4s5I9G8L2tlcsuFluLs3AU+u0Imfz/AMK8F+H+hw+JfG+h6LdSyRQX93HbvJHjcoY4JGeM19A/ET9l+HSvDV5qXhTV7u7urSNpmtLpFJmVRkhWXGGx0BBz04oA8D0zS/EvxE8UzfYre71bV7yUyzSAZwWPLO3RV9zgCvvH4JfD6P4c+B4NKaRZtQmc3N7KvRpSANq99qgAD1wTxnFfAPhTxHqvhTXLbV9Cu5LW9gbIZTww7qw6Mp7g1+j/AIE8RweLvB2ka9agLHfW6ylAc7H6Ov4MCPwoA3aKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArivjZ/ySPxf/wBgyf8A9BNdrWH460JvE/g7WdEjnW3fULWS3ErLuCFhjOOM0AfmPX6a/D7/AJELw1/2DLb/ANFLXzT/AMMlX/8A0Ntr/wCALf8AxdfUvhzTjpHh7S9NaQStZ2sVuZAMBiiBc47ZxQBmfEXwpa+NvBmqaBeMEW7jxHLtz5UgOUf8GA+oyO9fnL4q8O6n4V1670fXLV7a+tm2srDhh2ZT3U9Qe9fp7XGfEn4a+G/iHYrD4gsybmJSsF5Cdk0OfRu49iCPagD5k+D/AO0fdeE9Dt9E8U2E2qWNqojtrmBwJo0HRCG4YAcA5BAGOe3Q/ED9qdLrSp7TwRpV1bXUqlRe3+0NED1KxqWBb0JbA9DVbWv2TdQW4c6J4ntZYDyq3lu0bD2JUsD9cD6VFpX7JurvcJ/a3iawhgz8xtoHlYj23bR/h70AfOFrb3mralHBbRz3l9dSbVRQXkldj+ZJNfoH8Bfh9/wrvwJDY3OxtWu2+03rryA5AAQH0UAD65PenfC/4P8Ahb4eEXGl28l1qpQo1/dHdJg9QoHCD6DPqTXotAHzf+2X4Kn1TQNO8VWETSSaZmC7C8kQscq+PRW6/wC/noDXy54B8Waj4I8VWWvaQUNzbE5jkzslQjDI2OxB/Dg9q/TCeKOeGSGeNJIpFKOjqCrKRggg9Qa+ePH37LuiavdzXvhTUn0aSQlzaSR+bBk9l5DIP++h6AUAV1/ax0D+zN7eHNU/tHb/AKkSx+Vn08zOcf8AAK+ZPiN4z1Lx74rutd1fassuEjhTOyGMfdRc+nJ9ySe9ezD9lDxNvwdf0bZnriXOPpt/rXoXgH9mDQNFvIrzxRqEmuSxkMtsI/Jgz/tDJLj8QPUGgCj+xr4HuNL0bUPFmoxNFJqSi3s1YYJgByz/AEZgMf7mehFWf22v+RC0H/sJ/wDtJ6+iIo0hiSOJFSNAFVFGAoHQAdhXm/x0+Gs3xN8PafptvqUenNa3X2gyPCZAw2MuMAj+9QB8V/BP/krnhD/sJwf+hCv0er5n8C/sz3nhjxjo2tyeJre4TT7qO4MS2bKXCnOM7zivpigD80fiZoP/AAjHxA8QaMF2x2l5IsQxj92TlP8Ax0rX1T+xdr/2/wAA6nosj5l0y83oPSKUZA/77WQ/jV340fAH/hYXjH+3rDWYtNkkt0inje2MnmOuQHyGH8O0Y/2atfA74Lal8MfEl5ft4gt7+0u7cwS262pQ5DAqwO49MEfiaAPbqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAor59+L37QV34A8dXnh+Hw/BepBHG4me6KE70DdNp6ZrovgN8Ybj4oXmsQXGjxacLCOJwUnMm/eWHdRjG2gD2CiiigAoqrqmo2ek6fPf6ndQ2llAu+WaZwqIPUk186+Nv2qNKsbmS28JaPJqYU4+13LmGM+6rgsR9dtAH0pRXxmn7Vvi0XBL6JoRgxwgSYNn/e8zHr2r0XwD+1BoOr3EVp4rsJNEmbj7Sj+dAT78Bl/Ij1NAH0PRUdvNFcwRz28qSwyKHSSNgysp5BBHBFSUAFFYXjDxdoPg7TPt/iXUoLC3JITeSWkI7IoyzH2ANeA+Jv2r9OheSLw14duLsA4We9mEQPvsUMT+YoA+m6K+Oj+1h4j80EeHtI8r+7vkz+ef6V1fhD9qmDUdRtbHW/C88TzyLEstjcCQlmOB8jBe/+1QB9NUUVleJ/EOk+FtHm1XX76KysYvvSyHqeygDlifQAmgDVor5c8W/tXQRXDw+E/D5uIlJAub+TYG+ka84+rfhXL2/7V3itZmNxoehPFn5VRZUYD3Jc5/KgD7Lorw34b/tIeGfFN3Dp+tQSaDqEpCRmaQSQOx4wJMDb/wACAHvXuQORkdKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+DP2sf+S26v8A9cLf/wBFLXffsO/8hbxb/wBcLb/0KSuB/ax/5Lbq/wD1wt//AEUtd9+w7/yFvFv/AFwtv/QpKAPrWiisD4gau+geBfEGrRZ82zsJpo8f31Qlf1xQB8c/tO/FC58XeK7jQdNuGXw9pkpiCo3y3My8NI2OoByF+me9ct8GfhTqnxN1aaO2lWy0q1x9qvXXdtJ6Kq5G5j9QAOp6A+dEliSxJJ5JNfoP+zhoMWgfB7w+sce2W+h+3zMRgu0vzA/987R9BQBwF5+yj4XbT2Sy13Wor7bxLKYpI93rsCKce26vl/4keB9W+H/iabRtbRS4HmQzx58ueM9HUn8QR2IIr9K6+e/20NCgvPh/p2s7VF3p96sYfHJjkUhl/wC+lQ/gaAOH/ZE+JdxaawvgnVpmksboM+ns7E+TKBuMY9FYAkD+8P8Aar6Y+Ini6y8D+D9Q17Ufnjtk/dxA4M0h4RB9T37DJ7V+cfhfVZND8S6VqsJIksbqK5BH+w4b+lfS37b+tyD/AIRnQkyIT5l7JzwzDCJ+QL/nQB87eOfF2r+NvEFxq+u3TzTyE7Ez8kKdkQdgP16nJOa9G+Fv7PviTxxp0OqXc8Wi6TMN0Us8ZeWVf7yxgj5fckZ7ZHNcp8DfDEHi/wCKWhaTfIr2TSma4RujpGpcqfY7cfjX6LqoVQqgBQMAAcAUAfNA/ZM0fZg+KL/fjr9mTGfpn+tReEf2Z7zwz8RdC1b+2rTUtIsrkXEqyQtFKCoLJhcsD84XPI9cdq9d1P4yeANL1K70+/8AElvDeWkzwTRGKUlHUlWXhccEEVW/4Xn8N/8AoabX/vzL/wDEUAejTyxwQyTTOscUal3djgKAMkk+lfnr8cfiVe/EXxdPOJZE0S1cx2FtuO0IDjzCP77dSewwO1fW/wAePFUA+Amtaxos/n2+o2scMEyggPHMyoTzyPkZq+AaAPX/AIHfBPUPiSsuo3d0dN0GF/LM4TdJM46qg6ccZY+vAPOPZNe/ZR8PvpzjQNd1WC/AyhvTHLEx9CERSPrk/Q17j8P9Bi8MeCdE0WCMRiztI43Hq+MuT7lixPua6CgD8wvFfh7UvCviC90XWoDBfWj7HXsR1DKe6kYIPoa+q/2RPiVca1Yz+D9amMt1YQ+dYzO2WeEEAxknrtyMf7J/2awf23dChjvPDevRKqzzLLZzH+8Fwyf+hP8ApXjXwE1R9I+MXhS4jYjzb5LU+4l/dEf+P0AforRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfBn7WP8AyW3V/wDrhb/+ilrvv2Hf+Qt4t/64W3/oUlcD+1j/AMlt1f8A64W//opa6X9kDxToXhjU/Ez+IdWs9NSeGARG5lCByGfOM9cZFAH2dXFfGu1e8+Eni6GMMz/2bM4Cnk7VLf06Uf8AC1/AP/Q36J/4Fr/jV3SvGXhLxbLPpWk65pupyywt5lvBOrsY+jHA7c/rQB+adfo/8FL6PUPhH4QmhxtXTIIDg5+aNBGf1U18D/ErwldeCPGup6FeK2LeUmCRh/rYTyjj6jGffI7V7f8Ast/GHTvDli/hPxVcraWJlMtleSHEcRblo3P8IJywPTJbPagD6+rxH9sC+W1+D0kDMA15fQQqPXG5/wD2SvVrvxToFnp5v7rW9MisgC3ntdIEI9jnmvin9pX4pW/xB8RW1nojM2g6ZuEMjAr9okbG6TB5A4AGfc98UAeQ6favfX9taRZ8yeVYlwM8sQB/Ovoj9tu3ePxj4cn2kRPp7RqccZWQk8/8CFch+y94Jm8V/Euzv5Y2/szRWW8mcjgyA5iT6lhn6Ka+if2rPA8/iz4eLf6dE0uo6K7XKRquWeIgCRR74Ct/wD6UAfN/7LWpRad8atFE7BUukmtgT/eaNto/EgD8a++q/LKxu57C9t7yzlaG5t5FlikXqjqcgj3BAr7b+FP7Q3hrxJplvbeKbyHRdbRQsjXB2QTHgF1fouf7rYx70AeM/Eb4EePdS8a+KNYtNMt2sLrULq7ic3cYJjaRnBwTkcHpXgdfpTrnjTwtFot5JJ4k0VUMD4JvoueCOPm5r81qAPr74iWjXP7HGiuiufs9nYynb6blXn2+avkGv0G8CaFB4n/Z40bRLptsV/oiQF8Z2Ex8N+Bwfwr4I13SbzQtZvNL1OFob20laGVD2YH+XcH0oA/TvSr2LUtMs763IMN1Ck6EHOVZQR+hq1XzR+zN8Z9JPhuz8J+Kr6KxvbIeVZ3Nw+2OaL+FCx4Vl6DOMjGOa941zxn4b0LTWv8AVtc062tQu4M06kuOvygHLH2GaAPBP24L5E0DwvYbh5kt1NPtxzhEC5/8f/zivnn4L2j3vxa8HxRZ3LqlvMcDPCOHP6Ka0Pjp8Q2+I3jibUYVaLS7ZPs1jG33vLBJ3t/tMST7DA5xmvSP2N/BU+oeLLnxbcxstlpiNBbsRxJO64OP91Cc/wC+KAPsiiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+Kv2m/BnijWfi/ql7pHhvWr+zeGALPa2MssbERKDhlUg4NeV/8K48cf8AQm+JP/BXP/8AE1+lNFAH5rf8K48cf9Cb4k/8Fc//AMTXsv7KHhDxLofxRku9a8Paxp1qdPmTzruylhTcWTA3MoGeDx7V9iUUAecfGb4UaV8TNJRbh/sesWykWl6q525/gcfxIT26g8juD8beMPgz468LXEqXeg3V5bKcLdWCG4jYevyjK/8AAgK/RCigD8wovDWuyyBItF1N3PRVtJCT+GK9L8Afs9+NPE91G2p2baDp2QXnvl2yY9Fi+8T/AL20e9feVFAHN/D7wXo/gPw5Do+gwlIVO+SVzmSaQjl2PqcfQdBXSUUUAfNvxi/Ztg1y+uNY8DTQWN5KWkmsJiRDI55JRudhPPH3f90V87a78JfHuiSMt94V1VgucvbQm4T67o9wr9G6KAPzLHgrxUxAXw1rZJ4AFhL/APE11Gg/BH4h606iDwzeWyHBL3pW3Cg+zkH8ACa/QyigDnfhzotz4c8B6Bo1+0TXdjZxwSmIkoWVQDgkDI/CvP8A46/BOx+IyDU9Nmj0/wARxJsEzA+XcKOiyY5GOzDJHTB4x7FRQB+cXij4VeN/DM7pqfhzUDGpI8+3iM8R996ZA455wawrXwr4hu51htdC1WaVuAkdnIxP4AV+nVFAHxH8Nf2bvE+v3cVx4qQ6FpQILq5BuJB6Kgzt+rYx6GvsnwzoOm+GNDtNI0S2W1sLVNkca8/Uknkknkk9TWnRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHKeJviJ4S8L6kLDxBrtpYXhjEoilJztOQDwPY1L4V8e+F/Fl5Na+HNatdQuIY/NkSEnKrkDPI9SK+Rv2yP8AkrkX/YMh/wDQpK1v2Jf+R917/sGf+1UoA+yaxfFXirQ/CdnDdeI9Sg0+3mk8qN5icM2CccD0Brar51/ba/5ELQf+wn/7SegD1XR/ip4I1nU7bTtL8SWNze3D7IoULbnb0HFdrX51fAT/AJLH4S/6/l/ka/RWgDlPE3xE8JeF9SFh4g120sLwxiURSk52nIB4Hsayf+Fz/Dv/AKGzTvzb/CvmH9sj/krkX/YMh/8AQpK8g8OeHNZ8S3Utt4f0y71GeJPMeO2jLlVyBkgdskUAffv/AAuf4d/9DZp35t/hWp4b+I/hDxNqa6doOvWd9espcQxE7io6nkV8Hf8ACqPH3/Qoa3/4CN/hXrH7MXgPxX4f+K1tfa34f1Ows1tZkM1xAyKCV4GTQB9jVxmq/FPwLpV1JbX3irSUnjco8azhyjDqCFzgjpzXZ1+ZfxB/5H3xL/2E7n/0a1AH3X/wvP4b/wDQ02v/AH5l/wDiK0tH+LPgPWJlisfFWlmViFVJpfJLE9gHxk18T+Bfg54w8caINW0G0tpLAu0YkluUQll6jB571ieOfh/4n8DTxR+J9Kls1mJEUwZZI5Mdg6kjPt19qAP0pVgyhlIKkZBB4Ipa+E/2cvirqfhHxZp2i393JN4bv5lt3glbK2zOcLImfujcRuA4IzxnFfdlAHJeJPiP4Q8M6m2na9r1nY3qqHMMpO4Keh4FZf8Awuf4d/8AQ2ad+bf4V8q/td/8lmu/+vO3/wDQa8u8OeGdb8TTzQ+H9LvNRlhUPIltEXKqTjJxQB99/wDC5/h3/wBDZp35t/hWt4Z+InhLxRqRsPD+u2l/eCMymKInO0YBPI9xXwZ/wqjx9/0KGt/+Ajf4V7F+yv4G8U+HfidJe67oGpafaHT5YxNcQMi7iyYGT34NAH15RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfEH7ZH/JXIv+wZD/6FJUv7IGu6RoPjXWp9d1Sw02CTT9iSXlwkKs3mIcAsQCcA8VF+2R/yVyL/ALBkP/oUleHwW81wxW3iklYDJCKWIH4UAfpL/wALH8D/APQ5eG//AAaQf/FV4L+1/wCKvD2veCtFg0LXtJ1KePUN7x2d5HMyr5bjJCkkDJHNfLf9mX//AD5XX/fpv8KintLm3UNcW80Sk4BdCoJ/GgDuPgJ/yWPwl/1/L/I1+itfnV8BP+Sx+Ev+v5f5Gv0VoA+IP2yP+SuRf9gyH/0KSrv7Gd/Z6f451yS/u7e1jbTtqtNIEBPmpwCTVL9sj/krkX/YMh/9CkrxKysbu+dksrWe5dRkrDGXIHrxQB+m3/CTaD/0G9M/8C4/8atWGq6dqDslhf2l0yDLCCZXIHvg1+Zf/CPa1/0CNR/8Bn/wr6L/AGLtMv7HxV4ie9srq2VrJApmiZATv7ZFAH1rX5l/EH/kffEv/YTuf/RrV+mlfmX8Qf8AkffEv/YTuf8A0a1AH2T+yD/yRyD/AK/p/wCYo/a7vdOt/hBc2t60f2y5uYRZoT829XBZgPZNwJ/2vevkfw18TPGHhnRv7K0HXbixsAzOIokThj1OSuf1rB1/X9W8RXv2zXdSu9QucbRJcymQgegz0HsKAH+E7G41LxRpFlZIXubi7ijjUd2LgCv0+r5t/ZW+GXh61sofGS6tba1qeDHEIFYJYsR8ykMAxkwcZIHB4znNfSVAHwp+13/yWa7/AOvO3/8AQa6H9jDULPT/ABT4ie/u7e1RrJArTyqgJ39Bk1z37Xf/ACWa7/687f8A9Brx+ysLy+ZlsbW4uWUZYQxlyB74FAH6a/8ACTaD/wBBvTP/AALj/wAatWGq6dqDslhf2l0yDLCCZXIHvg1+Zf8Awj2tf9AjUf8AwGf/AAr6L/Yu0y/sfFXiJ72yurZWskCmaJkBO/tkUAfWtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB8Qftkf8lci/7BkP8A6FJWt+xL/wAj7r3/AGDP/aqVk/tkf8lci/7BkP8A6FJWt+xL/wAj7r3/AGDP/aqUAfZNfOv7bX/IhaD/ANhP/wBpPX0VXzr+21/yIWg/9hP/ANpPQB86fAT/AJLH4S/6/l/ka/RWvzq+An/JY/CX/X8v8jX6K0AfEH7ZH/JXIv8AsGQ/+hSVrfsS/wDI+69/2DP/AGqlZP7ZH/JXIv8AsGQ/+hSV5R4Q8X694OvZrvw1qMlhczR+VI6KrFlyDj5ge4FAH6bUV+ev/C8/iR/0NN1/35i/+Irsfg98XvHeufE7w5pmq+Iri5sbm7WOaJoowHXB4yFzQB9s1+ZfxB/5H3xL/wBhO5/9GtX6aV+ZfxB/5H3xL/2E7n/0a1AH1j+yv4Y0DWPhDFLq+iaXfyteTqz3VpHKxAIwCWB4ryD9qj4bad4H8RadqPh+3+zaVqiPm3XJSGZMbgvoCGBA9mxxwPd/2Qf+SOQf9f0/8xT/ANrbQDrPwjuLuJN0+lXMd2MddhJR/wAMPk/7tAHgn7I3iyXQ/iamjySsLDWo2gZCflEygtG314Zf+B/l9x1+XvhvVZtC8Q6Zq1sT51jcx3KY7lGDY/Sv07sLuG/sLa8tW329xGssbeqsAQfyNAHw3+13/wAlmu/+vO3/APQa6v8AYh/5GzxJ/wBeMf8A6MrlP2u/+SzXf/Xnb/8AoNeb+D/GXiDwbc3Fx4Z1KSwmuEEcrIisWUHIHzA96AP0zor89f8AhefxI/6Gm6/78xf/ABFd18D/AIteOfEHxV8P6XrHiC4urC5ldZYWijAcCNyOQoPUCgD7QooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOP8V/DPwf4t1Qaj4i0SG+vRGIhK8kinaCSB8rAdzUvhD4d+FPB17Nd+GtHhsLmaPypHR3YsuQcfMx7gV534h/aV8HaDr+p6Reab4ge50+6ltJWighKM8blSVJlBxkHGQKz/8AhqvwP/0CvEn/AIDwf/HqAPf6wfF/hDQfGNlDaeJdOjv7aGTzY0dmUK2CM/KR2Jrx7/hqvwP/ANArxJ/4Dwf/AB6j/hqvwP8A9ArxJ/4Dwf8Ax6gD0PRPhD4E0PVbXU9K8O29tfWziSGVZZCUb1wWxXeV4B/w1X4H/wCgV4k/8B4P/j1H/DVfgf8A6BXiT/wHg/8Aj1AHp/iv4Z+D/FuqDUfEWiQ316IxEJXkkU7QSQPlYDuaxv8AhRnw3/6Fa1/7/S//ABdcT/w1X4H/AOgV4k/8B4P/AI9R/wANV+B/+gV4k/8AAeD/AOPUAdt/woz4b/8AQrWv/f6X/wCLq7onwh8CaHqtrqeleHbe2vrZxJDKsshKN64LYrzz/hqvwP8A9ArxJ/4Dwf8Ax6j/AIar8D/9ArxJ/wCA8H/x6gD3+vPL74L/AA9v724u7vwzbS3NxI0srmWUFmY5J4buTXB/8NV+B/8AoFeJP/AeD/49R/w1X4H/AOgV4k/8B4P/AI9QB7R4W8N6R4U0oaZ4fsksrEO0giRmYbj1OWJNXtSsbbU9OubC/hSezuY2hmifo6MMEH6g14T/AMNV+B/+gV4k/wDAeD/49R/w1X4H/wCgV4k/8B4P/j1AHbf8KM+G/wD0K1r/AN/pf/i677R9NtNH0u107TYfJsrWMRQxbiwRAMAAkk4Arwv/AIar8D/9ArxJ/wCA8H/x6j/hqvwP/wBArxJ/4Dwf/HqAPTPFHww8G+KtWbU/EGhQXt8yKhleSRSVHQYDAVk/8KM+G/8A0K1r/wB/pf8A4uuJ/wCGq/A//QK8Sf8AgPB/8eo/4ar8D/8AQK8Sf+A8H/x6gDtv+FGfDf8A6Fa1/wC/0v8A8XWhoHwl8DeH9YttU0fw/b2t/bEtFMsshKEgg8FiOhNec/8ADVfgf/oFeJP/AAHg/wDj1dP8Ofjt4Z8f+Jo9D0ex1mG7eN5Q91DEqYUZPKyMc/hQB6xRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfmt8WP+Sp+Mv+w1e/8Ao965SvUPib4B8Y3nxJ8WXVn4T8QT202rXckUsWmzMkiNM5DKQuCCCCCK5r/hXHjj/oTfEn/grn/+JoA5Siur/wCFceOP+hN8Sf8Agrn/APiaP+FceOP+hN8Sf+Cuf/4mgDlKK6v/AIVx44/6E3xJ/wCCuf8A+Jo/4Vx44/6E3xJ/4K5//iaAOUorq/8AhXHjj/oTfEn/AIK5/wD4mj/hXHjj/oTfEn/grn/+JoA5Siur/wCFceOP+hN8Sf8Agrn/APiaP+FceOP+hN8Sf+Cuf/4mgDlKK6v/AIVx44/6E3xJ/wCCuf8A+Jo/4Vx44/6E3xJ/4K5//iaAOUorq/8AhXHjj/oTfEn/AIK5/wD4mj/hXHjj/oTfEn/grn/+JoA5Siur/wCFceOP+hN8Sf8Agrn/APiaP+FceOP+hN8Sf+Cuf/4mgDlKK6v/AIVx44/6E3xJ/wCCuf8A+Jo/4Vx44/6E3xJ/4K5//iaAOUr2n9kT/ks1p/153H/oNcD/AMK48cf9Cb4k/wDBXP8A/E165+y54O8TaL8Wba81jw5rOn2gtZ1M91YyxICV4G5lAyaAPs2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k=\" width=\"90\"></div><p style=\"margin:0;padding:0;text-align:center;font-weight:900;font-size:19px;direction:ltr\">Sale Invoice</p><div id=\"title-section\" style=\"text-align:center;font-size:14px;font-weight:900;padding:0;margin:0px;direction:ltr\">3-4-3</div><div id=\"title-section\" style=\"text-align:center;font-size:14px;font-weight:900;padding:0;margin:0px;direction:ltr\">3</div><div id=\"title-section\" style=\"text-align:center;font-size:14px;font-weight:900;padding:0;margin:0px;direction:ltr\">2023-11-22 03:32 PM</div><hr style=\"background-color: black ;height: 1px; margin:0;\"><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"1\" style=\"width:100%;text-align:center;font-weight:bold;font-size:13px;direction:ltr;\"><thead><tr><th class=\"table-border\" style=\"text-align:center;font-weight:900;padding:0;margin:0px;font-size:13px;width:40%\">Product</th><th class=\"table-border\" style=\"text-align:center;font-weight:900;padding:0;margin:0px;font-size:13px;width:12%\">QTY</th><th class=\"table-border\" style=\"text-align:center;font-weight:900;padding:0;margin:0px;font-size:13px;width:12%\">Price</th><th class=\"table-border\" style=\"text-align:center;font-weight:900;padding:0;margin:0px;font-size:13px;width:12%\">Tax</th><th class=\"table-border\" style=\"text-align:center;font-weight:900;padding:0;margin:0px;font-size:13px;width:12%\">Total</th></tr></thead><tbody><tr><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:40%\">IZZO 1</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">1</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">0.00</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">0</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">0.00</td></tr><tr><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;\" colspan=\"5\">\n" +
              " SN: 8088 </td></tr><tr><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:40%\">Barcode 4</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">1</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">70.00</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">0</td><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;width:12%\">70.00</td></tr><tr><td class=\"table-border\" style=\"text-align:center;font-size:13px;font-weight:900;padding:0;margin:0px;\" colspan=\"5\">UPC: 100000004</td></tr></tbody></table></div><hr style=\"background-color: black ;height: 1px; margin:0;\"><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table-border\" style=\"width:95%;font-size:14px;direction:ltr;font-weight:bold;\"><tbody><tr><td style=\"width:50%;\">Subtotal</td><td style=\"width:50%\">70.00</td></tr></tbody></table></div><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table-border\" style=\"width:95%;font-size:14px;direction:ltr;font-weight:bold;\"><tbody><tr><td style=\"width:50%;\">Discount</td><td style=\"width:50%\">0.00</td></tr></tbody></table></div><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table-border\" style=\"width:95%;font-size:14px;direction:ltr;font-weight:bold;\"><tbody><tr><td style=\"width:50%;\">Tax</td><td style=\"width:50%\">0.00</td></tr></tbody></table></div><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table-border\"  style=\"width:95%;font-size:30px;direction:ltr;font-weight:bold;\"><tbody><tr><td style=\"width:50%;\">Total</td><td style=\"width:50%\">70.00</td></tr></tbody></table></div><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table-border\" style=\"width:95%;font-size:14px;direction:ltr;font-weight:bold;\"><tbody><tr><td style=\"width:50%;\">Paid Amount</td><td style=\"width:50%\">70.00</td></tr></tbody></table></div><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table-border\" style=\"width:95%;font-size:14px;direction:ltr;font-weight:bold;\"><tbody><tr><td style=\"width:50%;\">Remaining</td><td style=\"width:50%\">0.00</td></tr></tbody></table></div><hr style=\"background-color: black ;height: 1px; margin:0;\"><div class=\"custom-center\" style=\"width:100%;text-align:center;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table-border\" style=\"width:95%;font-size:14px;direction:ltr;font-weight:bold;\"><tbody><tr><td style=\"width:50%;\">Cash</td><td style=\"width:50%\">70</td></tr></tbody></table></div><hr style=\"background-color: black ;height: 1px; margin:0;\"><div class=\"custom-center\" style=\"flex-direction:column;margin:0.5px;padding:1px;white-space: normal;text-align:center;font-size:14px;font-weight:bold;direction:ltr;\">You Served By: admin</div><div class=\"custom-center\" style=\"flex-direction:column;margin:0.5px;padding:1px;white-space: normal;text-align:center;font-size:14px;font-weight:bold;direction:ltr;\"></div><div class=\"custom-center\" style=\"flex-direction:column;margin:0.5px;padding:1px;white-space: normal;text-align:center;font-size:14px;font-weight:bold;direction:ltr;\"></div></body></html>";
//      Thread.sleep(12000);
//    Log.d(TAG, "printTcp: "+connection.connect());
   // printHTML("in thermal function" , autoCut, openCashbox,  mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine, ipAddress, (int) port, (int) timeout);
//     html2bitmap(html, context);
//       this.payload=payload;
//       cc=this;
///      connection = new TcpConnection("192.168.1.142", 9100, 30000);
      TcpConnection connection = new TcpConnection(ipAddress, (int) port, (int) timeout);
      this.printIt(connection, payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine);
//      try {
//
//        Intent serviceIntent = new Intent(context, converthtml.class);
//        serviceIntent.putExtra("html", html);
//        serviceIntent.putExtra("ipAddress", ipAddress);
//        serviceIntent.putExtra("port", port);
//        serviceIntent.putExtra("timeout", timeout);
//        serviceIntent.putExtra("autoCut", autoCut);
//        serviceIntent.putExtra("openCashbox", openCashbox);
//        serviceIntent.putExtra("mmFeedPaper", mmFeedPaper);
//        serviceIntent.putExtra("printerDpi", printerDpi);
//        serviceIntent.putExtra("printerWidthMM", printerWidthMM);
//        serviceIntent.putExtra("printerNbrCharactersPerLine", printerNbrCharactersPerLine);
////    serviceIntent.("connection", connection);
//        context.startService(serviceIntent);
//      }catch (Exception e){
//        Log.d("TAG", "printTcp: "+e.getMessage());
//      }

    } catch (Exception e) {
      this.jsPromise.reject("Connection Error", e.getMessage());
    }
  }

  public void printHTML(String encoded, boolean autoCut, boolean openCashbox, double mmFeedPaper, double printerDpi, double printerWidthMM, double printerNbrCharactersPerLine, String ipAddress, int port, int timeout) {

TcpConnection connection = new TcpConnection(ipAddress, (int) port, (int) timeout);

//    this.printIt( encoded, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine);
  }

  @ReactMethod
  public void printBluetooth(String macAddress, String payload, boolean autoCut, boolean openCashbox, double mmFeedPaper, double printerDpi, double printerWidthMM, double printerNbrCharactersPerLine, Promise promise) {
    this.jsPromise = promise;
    BluetoothConnection btPrinter;

    if (TextUtils.isEmpty(macAddress)) {
      btPrinter = BluetoothPrintersConnections.selectFirstPaired();
    } else {
      btPrinter = getBluetoothConnectionWithMacAddress(macAddress);
    }

    if (btPrinter == null) {
      this.jsPromise.reject("Connection Error", "Bluetooth Device Not Found");
    }

    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH}, 1);
    } else if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH_ADMIN) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH_ADMIN}, 1);
    } else if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH_CONNECT}, 1);
    } else if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH_SCAN}, 1);
    } else {
      try {
        this.printIt2(btPrinter.connect(), payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine);
      } catch (Exception e) {
        this.jsPromise.reject("Connection Error", e.getMessage());
      }
    }
  }

  @ReactMethod
  public void getBluetoothDeviceList(Promise promise) {
    this.jsPromise = promise;
    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH}, 1);
    } else if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH_ADMIN) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH_ADMIN}, 1);
    } else if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH_CONNECT}, 1);
    } else if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S && ContextCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH_SCAN}, 1);
    } else {
      try {
        Set<BluetoothDevice> pairedDevices = BluetoothAdapter.getDefaultAdapter().getBondedDevices();
        WritableArray rnArray = new WritableNativeArray();
        if (pairedDevices.size() > 0) {
          int index = 0;
          for (BluetoothDevice device : pairedDevices) {
            btDevicesList.add(new BluetoothConnection(device));
            JSONObject jsonObj = new JSONObject();

            String deviceName = device.getName();
            String macAddress = device.getAddress();

            jsonObj.put("deviceName", deviceName);
            jsonObj.put("macAddress", macAddress);
            WritableMap wmap = convertJsonToMap(jsonObj);
            rnArray.pushMap(wmap);
          }
        }
        jsPromise.resolve(rnArray);


      } catch (Exception e) {
        this.jsPromise.reject("Bluetooth Error", e.getMessage());
      }
    }
  }

  Bitmap getBitmapFromUrl(String url) {
    try {
      Bitmap bitmap = Glide
        .with(getCurrentActivity())
        .asBitmap()
        .load(url)
        .submit()
        .get();
      return bitmap;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  /**
   * Synchronous printing
   */

  String preprocessImgTag(EscPosPrinter printer, String text) {

    Pattern p = Pattern.compile("(?<=\\<img\\>)(.*)(?=\\<\\/img\\>)");
    Matcher m = p.matcher(text);
    StringBuffer sb = new StringBuffer();
    while (m.find()) {
      String firstGroup = m.group(1);
      m.appendReplacement(sb, PrinterTextParserImg.bitmapToHexadecimalString(printer, getBitmapFromUrl(firstGroup)));
    }
    m.appendTail(sb);

    return sb.toString();
  }


  public void printIt( DeviceConnection printerConnection,String payload, boolean autoCut, boolean openCashbox, double mmFeedPaper, double printerDpi, double printerWidthMM, double printerNbrCharactersPerLine) {

    try {
      EscPosPrinter printer = new EscPosPrinter(printerConnection, (int) printerDpi, (float) printerWidthMM, (int) printerNbrCharactersPerLine);
      Log.d(TAG, "printIt: "+printer);
      String processedPayload = preprocessImgTag(printer, payload);
      if (openCashbox) {
        printer.printFormattedTextAndOpenCashBox(processedPayload, (float) mmFeedPaper);
      } else if (autoCut) {
        printer.printFormattedTextAndCut(processedPayload, (float) mmFeedPaper);
      } else {
        printer.printFormattedText(processedPayload, (float) mmFeedPaper);
      }

      printer.disconnectPrinter();
      this.jsPromise.resolve(true);
    } catch (EscPosConnectionException e) {
//      this.jsPromise.reject("Broken connection", e.getMessage());
      Log.d("ERROR", "printIt: Broken connection " + e.getMessage());

    } catch (EscPosParserException e) {
//      this.jsPromise.reject("Invalid formatted text", e.getMessage());
      Log.d("ERROR", "Invalid formatted text " + e.getMessage());

    } catch (EscPosEncodingException e) {
//      this.jsPromise.reject("Bad selected encoding", e.getMessage());
      Log.d("ERROR", "Bad selected encoding " + e.getMessage());

    } catch (EscPosBarcodeException e) {
      Log.d("ERROR", "Invalid barcode " + e.getMessage());

//      this.jsPromise.reject("Invalid barcode", e.getMessage());
    } catch (Exception e) {
//      this.jsPromise.reject("ERROR", e.getMessage());
      Log.d("ERROR", "printIt: Error " + e.getMessage());
    }
  }

  public void printIt2( DeviceConnection printerConnection,String payload, boolean autoCut, boolean openCashbox, double mmFeedPaper, double printerDpi, double printerWidthMM, double printerNbrCharactersPerLine) {
    EscPosPrinter printer = null;
    try {     printer = new EscPosPrinter(printerConnection, (int) printerDpi, (float) printerWidthMM, (int) printerNbrCharactersPerLine);

      Log.d(TAG, "printIt: "+printer);
      String processedPayload = preprocessImgTag(printer, payload);
      if (openCashbox) {
        printer.printFormattedTextAndOpenCashBox(processedPayload, (float) mmFeedPaper);
      } else if (autoCut) {
        printer.printFormattedTextAndCut(processedPayload, (float) mmFeedPaper);
      } else {
        printer.printFormattedText(processedPayload, (float) mmFeedPaper);
      }
//      printer.disconnectPrinter();
      this.jsPromise.resolve(true);
    } catch (EscPosConnectionException e) {
//      this.jsPromise.reject("Broken connection", e.getMessage());
      printer.disconnectPrinter();
      Log.d("ERROR", "printIt: Broken connection " + e.getMessage());

    } catch (EscPosParserException e) {
//      this.jsPromise.reject("Invalid formatted text", e.getMessage());
      Log.d("ERROR", "Invalid formatted text " + e.getMessage());

    } catch (EscPosEncodingException e) {
//      this.jsPromise.reject("Bad selected encoding", e.getMessage());
      Log.d("ERROR", "Bad selected encoding " + e.getMessage());

    } catch (EscPosBarcodeException e) {
      Log.d("ERROR", "Invalid barcode " + e.getMessage());

//      this.jsPromise.reject("Invalid barcode", e.getMessage());
    } catch (Exception e) {
//      this.jsPromise.reject("ERROR", e.getMessage());
      Log.d("ERROR", "printIt: Error " + e.getMessage());
    }
  }

  private BluetoothConnection getBluetoothConnectionWithMacAddress(String macAddress) {
    for (BluetoothConnection device : btDevicesList) {
      if (device.getDevice().getAddress().contentEquals(macAddress))
        return device;
    }
    return null;
  }

  private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
    WritableMap map = new WritableNativeMap();

    Iterator<String> iterator = jsonObject.keys();
    while (iterator.hasNext()) {
      String key = iterator.next();
      Object value = jsonObject.get(key);
      if (value instanceof JSONObject) {
        map.putMap(key, convertJsonToMap((JSONObject) value));
      } else if (value instanceof Boolean) {
        map.putBoolean(key, (Boolean) value);
      } else if (value instanceof Integer) {
        map.putInt(key, (Integer) value);
      } else if (value instanceof Double) {
        map.putDouble(key, (Double) value);
      } else if (value instanceof String) {
        map.putString(key, (String) value);
      } else {
        map.putString(key, value.toString());
      }
    }
    return map;
  }

  public void done(Bitmap bitmap) {
    Log.d(TAG, "done: "+bitmap);
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
    byte[] byteArray = byteArrayOutputStream .toByteArray();

    String encoded = Base64.encodeToString(byteArray, Base64.DEFAULT);
    TcpConnection connection = new TcpConnection("192.168.1.142", 9100, 30000);
//ThermalPrinterModule thermalPrinterModule=new ThermalPrinterModule(context);
//thermalPrinterModule.printIt(connection, payload, true, false, 20, 203, 80, 42);
//    this.printIt(connection, payload, true, false, 20, 203, 80, 42);






    try {
      EscPosPrinter printer = new EscPosPrinter(connection, 203, 80, 42);
      Log.d(TAG, "printIt: "+printer);
      String processedPayload = preprocessImgTag(printer, payload);
      printer.printFormattedText(processedPayload, 20);
      printer.disconnectPrinter();
      this.jsPromise.resolve(true);
    } catch (EscPosConnectionException e) {
//      this.jsPromise.reject("Broken connection", e.getMessage());
      Log.d("ERROR", "printIt: Broken connection " + e.getMessage());

    } catch (EscPosParserException e) {
//      this.jsPromise.reject("Invalid formatted text", e.getMessage());
      Log.d("ERROR", "Invalid formatted text " + e.getMessage());

    } catch (EscPosEncodingException e) {
//      this.jsPromise.reject("Bad selected encoding", e.getMessage());
      Log.d("ERROR", "Bad selected encoding " + e.getMessage());

    } catch (EscPosBarcodeException e) {
      Log.d("ERROR", "Invalid barcode " + e.getMessage());

//      this.jsPromise.reject("Invalid barcode", e.getMessage());
    } catch (Exception e) {
//      this.jsPromise.reject("ERROR", e.getMessage());
      Log.d("ERROR", "printIt: Error " + e.getMessage());
    }

  }


//  @Override
//  public void done(Bitmap bitmap) {
//    Log.d("Test", "done: " + bitmap);
//  }
public static Bitmap convertHtmlToBitmap(Context context, String html) {
  try {
    WebView wv = new WebView(context);
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
//      return new BitmapGeneratingAsyncTask(context, html, 576).execute().get();
    }
  } catch (Exception e) {
    e.printStackTrace();
  }

  return null;
}

}