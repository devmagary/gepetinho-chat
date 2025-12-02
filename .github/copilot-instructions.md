# Chat Gepetinho - Copilot Instructions

## Project Overview
React Native P2P chat app using WebRTC (via PeerJS). Messages travel directly between devices without central servers.

## Architecture

```
index.js          → Entry point with polyfills (MUST load first)
    ↓
App.js            → React Navigation setup (Home → Chat)
    ↓
screens/          → UI components (HomeScreen, ChatScreen)
    ↓
services/P2PService.js → Singleton managing PeerJS/WebRTC connections
```

**Data Flow:** `PeerJS Server (signaling only) → WebRTC handshake → Direct P2P connection`

## Critical Constraints

### Hermes Engine Incompatibilities
The Hermes JS engine lacks `URLSearchParams.set()`. Two fixes are required:
1. **Polyfills in `index.js`** - Must be imported BEFORE any other code
2. **Patch in `node_modules/peerjs/dist/bundler.{mjs,cjs}`** - Replaces `url.searchParams.set()` with manual URL string construction

```javascript
// ❌ BROKEN in Hermes (PeerJS default)
url.searchParams.set("ts", timestamp);

// ✅ PATCHED version
const urlString = `${baseUrl}?ts=${encodeURIComponent(ts)}`;
```

### React Native New Architecture
**Must be disabled** in `android/gradle.properties`:
```properties
newArchEnabled=false  # react-native-webrtc incompatible with Fabric/TurboModules
```

## Build Commands

```bash
# Development
npx react-native start          # Metro bundler
npx react-native run-android    # Install & run

# Release APK (standalone)
npx react-native bundle --platform android --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res
cd android && ./gradlew assembleDebug && cd ..
```

## Key Patterns

### P2PService Singleton (`services/P2PService.js`)
- Exported as `new P2PService()` (singleton instance)
- Callbacks: `onMessageReceived`, `onConnectionOpened`, `onDisconnected`, `onError`
- Call `initialize()` once on app start, then use `connectToPeer(id)`

### WebRTC Globals Setup
```javascript
// Required in P2PService.js BEFORE importing peerjs
global.RTCPeerConnection = RTCPeerConnection;
global.RTCIceCandidate = RTCIceCandidate;
global.RTCSessionDescription = RTCSessionDescription;
```

## Android Permissions Required
WebRTC crashes without these in `AndroidManifest.xml`:
- `INTERNET`, `ACCESS_NETWORK_STATE`, `ACCESS_WIFI_STATE`, `CHANGE_NETWORK_STATE`

## Debugging

```bash
# View JS logs
adb logcat -s "ReactNativeJS"

# View crash logs
adb logcat -s "ReactNativeJS" "AndroidRuntime" | Select-String "FATAL|Exception"

# Clear Metro cache
npx react-native start --reset-cache
```

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `URLSearchParams.set is not implemented` | Hermes limitation | Apply PeerJS patch + polyfills |
| `ACCESS_NETWORK_STATE permission` | Missing permission | Add to AndroidManifest.xml |
| App crashes on connect | New architecture enabled | Set `newArchEnabled=false` |
| `Unable to load script` | Bundle not generated | Run `npx react-native bundle...` |
