// AutolinkedNativeModules.g.cpp contents generated by "react-native autolink-windows"
// clang-format off
#include "pch.h"
#include "AutolinkedNativeModules.g.h"

// Includes from @react-native-async-storage/async-storage
#include <winrt/ReactNativeAsyncStorage.h>

// Includes from @react-native-community/checkbox
#include <winrt/CheckboxWindows.h>

// Includes from react-native-print
#include <winrt/RNPrint.h>

// Includes from react-native-restart
#include <winrt/ReactNativeRestart.h>

// Includes from react-native-screens
#include <winrt/RNScreens.h>

// Includes from react-native-webview
#include <winrt/ReactNativeWebView.h>

namespace winrt::Microsoft::ReactNative
{

void RegisterAutolinkedNativeModulePackages(winrt::Windows::Foundation::Collections::IVector<winrt::Microsoft::ReactNative::IReactPackageProvider> const& packageProviders)
{ 
    // IReactPackageProviders from @react-native-async-storage/async-storage
    packageProviders.Append(winrt::ReactNativeAsyncStorage::ReactPackageProvider());
    // IReactPackageProviders from @react-native-community/checkbox
    packageProviders.Append(winrt::CheckboxWindows::ReactPackageProvider());
    // IReactPackageProviders from react-native-print
    packageProviders.Append(winrt::RNPrint::ReactPackageProvider());
    // IReactPackageProviders from react-native-restart
    packageProviders.Append(winrt::ReactNativeRestart::ReactPackageProvider());
    // IReactPackageProviders from react-native-screens
    packageProviders.Append(winrt::RNScreens::ReactPackageProvider());
    // IReactPackageProviders from react-native-webview
    packageProviders.Append(winrt::ReactNativeWebView::ReactPackageProvider());
}

}
