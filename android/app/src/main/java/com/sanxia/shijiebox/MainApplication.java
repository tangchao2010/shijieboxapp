package com.sanxia.shijiebox;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import org.reactnative.camera.RNCameraPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.puti.paylib.PayReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AMapGeolocationPackage(),
            new ReactVideoPackage(),
            new ReanimatedPackage(),
            new RNCameraPackage(),
            new RNDeviceInfo(),
            new RNCWebViewPackage(),
          new SplashScreenReactPackage(),
          new RNGestureHandlerPackage(),
          new PayReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }


}
