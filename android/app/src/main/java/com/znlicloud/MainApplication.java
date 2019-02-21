package com.znlicloud;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.theweflex.react.WeChatPackage;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.ReadableNativeMap;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {
  private final String CODEPUSH_KEY_PRODUCTIO = "x2D2xLa-NGE1OsbFXTZRwGFNgS-vd2879c22-c96e-4d6e-bef4-b597a869454d";
  private final String CODEPUSH_KEY_STAGING = "kVEeKJnlKXu88Jfvzo7acX5FxOphd2879c22-c96e-4d6e-bef4-b597a869454d";

  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = true;
  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = true;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNGestureHandlerPackage(), new WeChatPackage(), new MPAndroidChartPackage(),
          new RNDeviceInfo(), new SplashScreenReactPackage(),
          // new
          // CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey),
          // getApplicationContext(), BuildConfig.DEBUG),
          new CodePush(CODEPUSH_KEY_PRODUCTIO, getApplicationContext(), BuildConfig.DEBUG),
          // new CodePush(CODEPUSH_KEY_STAGING, getApplicationContext(),
          // BuildConfig.DEBUG), new VectorIconsPackage(),
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG));
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

    ReadableNativeArray.setUseNativeAccessor(true);
    ReadableNativeMap.setUseNativeAccessor(true);
  }
}
