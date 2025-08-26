# Android Production Signing Setup

## Step 1: Generate Production Keystore

```bash
# Navigate to android/app directory
cd finance_app/android/app

# Generate production keystore (replace with your details)
keytool -genkeypair -v -storetype PKCS12 \
  -keystore personal-finance-release-key.keystore \
  -alias personal-finance-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=Your Name, OU=Personal, O=Personal, L=Your City, ST=Your State, C=US"
```

## Step 2: Create gradle.properties (Android directory)

Create `finance_app/android/gradle.properties` with:

```properties
# Existing content...

# Keystore credentials (keep these secret!)
PERSONAL_FINANCE_UPLOAD_STORE_FILE=personal-finance-release-key.keystore
PERSONAL_FINANCE_UPLOAD_KEY_ALIAS=personal-finance-key-alias
PERSONAL_FINANCE_UPLOAD_STORE_PASSWORD=YOUR_STORE_PASSWORD
PERSONAL_FINANCE_UPLOAD_KEY_PASSWORD=YOUR_KEY_PASSWORD
```

## Step 3: Update build.gradle

Update `finance_app/android/app/build.gradle`:

```gradle
android {
    // ... existing config

    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('PERSONAL_FINANCE_UPLOAD_STORE_FILE')) {
                storeFile file(PERSONAL_FINANCE_UPLOAD_STORE_FILE)
                storePassword PERSONAL_FINANCE_UPLOAD_STORE_PASSWORD
                keyAlias PERSONAL_FINANCE_UPLOAD_KEY_ALIAS
                keyPassword PERSONAL_FINANCE_UPLOAD_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

## Step 4: Test Release Build

```bash
# Navigate to android directory
cd finance_app/android

# Generate release AAB for Play Store
./gradlew bundleRelease

# The AAB will be at: app/build/outputs/bundle/release/app-release.aab
```

## Security Notes:
- ⚠️  **NEVER commit keystore files or passwords to git**
- ⚠️  **Keep backups of your keystore - you can't recover it if lost**
- ⚠️  **Add keystore files to .gitignore**

## Add to .gitignore:
```
# Android signing
*.keystore
android/gradle.properties
```
