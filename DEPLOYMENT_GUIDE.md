# App Store Deployment Guide

## Prerequisites

### For iOS App Store
1. **Apple Developer Account** ($99/year)
   - Sign up at https://developer.apple.com
   - Complete account verification

2. **App Store Connect**
   - Create new app at https://appstoreconnect.apple.com
   - Set up app metadata, description, screenshots
   - Configure App Store listing

### For Google Play Store
1. **Google Play Console Account** ($25 one-time fee)
   - Sign up at https://play.google.com/console
   - Complete account verification

2. **Play Console Setup**
   - Create new app
   - Set up store listing
   - Configure app content rating

## Step-by-Step Deployment

### 1. Expo Account Setup
```bash
# Create account at https://expo.dev
# Then login
eas login
```

### 2. Project Configuration
```bash
# In your project directory
eas build:configure
```

### 3. Update app.json
Update the following in your `app.json`:
- `extra.eas.projectId`: Your Expo project ID
- `ios.bundleIdentifier`: Your unique bundle ID (e.g., com.yourcompany.openchat)
- `android.package`: Your unique package name (e.g., com.yourcompany.openchat)

### 4. Build for Production

#### iOS Build
```bash
# Build for iOS App Store
eas build --platform ios --profile production
```

#### Android Build
```bash
# Build for Android Play Store
eas build --platform android --profile production
```

### 5. Submit to App Stores

#### iOS Submission
```bash
# Submit to App Store
eas submit --platform ios
```

#### Android Submission
```bash
# Submit to Play Store
eas submit --platform android
```

## App Store Listing Requirements

### App Description
```
Start WhatsApp conversations instantly without saving phone numbers to your contacts.

Open Chat is a simple, privacy-focused utility that lets you:

• Enter any international phone number
• Instantly open WhatsApp conversations
• No need to save contacts to your phone
• Works with all international numbers
• Complete privacy - no data collection

Perfect for:
- Contacting businesses
- One-time conversations
- International communication
- Temporary chats

Simple, fast, and secure. Your privacy is our priority.
```

### Keywords
```
whatsapp, chat, messaging, phone, contact, business, international, privacy, utility, communication
```

### App Categories
- **Primary**: Utilities
- **Secondary**: Business or Social Networking

## Screenshots Needed

### iPhone (6.7" Display)
- App home screen
- Number entry example
- WhatsApp opening flow
- Success state

### iPad
- App on iPad layout
- Landscape and portrait orientations

### Android
- Various screen sizes
- App functionality demonstration

## Privacy Policy

The app includes a privacy policy in `PRIVACY_POLICY.md`. You'll need to:
1. Host this on a public website
2. Update the contact email to your actual email
3. Provide the URL in app store listings

## App Review Guidelines

### iOS App Review
- Ensure app follows Apple's Human Interface Guidelines
- Test on various iOS devices
- Verify WhatsApp integration works properly
- Prepare demo video if requested

### Android Review
- Follow Material Design guidelines
- Test on various Android devices
- Ensure proper permissions handling

## Pre-Submission Checklist

- [ ] App builds successfully on EAS
- [ ] Tested on physical devices (iOS and Android)
- [ ] All app store assets ready (icons, screenshots, descriptions)
- [ ] Privacy policy hosted and accessible
- [ ] Bundle ID/Package name unique and configured
- [ ] App Store Connect / Play Console app created
- [ ] Developer accounts active and verified

## Common Issues & Solutions

### Build Failures
- Check Expo SDK compatibility
- Verify all dependencies are compatible
- Review build logs for specific errors

### App Store Rejection
- Usually related to metadata or functionality description
- Ensure app does exactly what description states
- Provide clear usage instructions

### WhatsApp Integration
- Test on various devices to ensure URL schemes work
- Verify fallback options function properly
- Test with and without WhatsApp installed

## Post-Launch

### Updates
```bash
# For over-the-air updates (minor changes)
eas update

# For major updates requiring new builds
eas build --platform all --profile production
```

### Monitoring
- Monitor app store reviews
- Track download metrics
- Watch for crash reports

## Support

If you encounter issues:
1. Check Expo documentation
2. Review EAS build logs
3. Test locally before building
4. Contact app store support if needed

Good luck with your app launch! 🚀
