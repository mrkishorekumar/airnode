import 'react-native-paper';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import fontFamilies from '../constants/fontFamilies';

/**
 * MD3 Typography variants:
 * Display: displayLarge, displayMedium, displaySmall
 * Headline: headlineLarge, headlineMedium, headlineSmall
 * Title: titleLarge, titleMedium, titleSmall
 * Label: labelLarge, labelMedium, labelSmall
 * Body: bodyLarge, bodyMedium, bodySmall
 */

const baseFonts = {
  // Display
  displayLarge: {
    fontFamily: fontFamilies.SemiBold,
    fontSize: 57,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: fontFamilies.SemiBold,
    fontSize: 45,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: fontFamilies.SemiBold,
    fontSize: 36,
    lineHeight: 44,
  },

  // Headline
  headlineLarge: {
    fontFamily: fontFamilies.SemiBold,
    fontSize: 32,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: fontFamilies.SemiBold,
    fontSize: 28,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: fontFamilies.SemiBold,
    fontSize: 24,
    lineHeight: 32,
  },

  // Title
  titleLarge: {
    fontFamily: fontFamilies.Medium,
    fontSize: 22,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: fontFamilies.Medium,
    fontSize: 16,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: fontFamilies.Medium,
    fontSize: 14,
    lineHeight: 20,
  },

  // Body
  bodyLarge: {
    fontFamily: fontFamilies.Regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: fontFamilies.Regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: fontFamilies.Regular,
    fontSize: 12,
    lineHeight: 16,
  },

  // Label
  labelLarge: {
    fontFamily: fontFamilies.Medium,
    fontSize: 14,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: fontFamilies.Medium,
    fontSize: 12,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: fontFamilies.Medium,
    fontSize: 11,
    lineHeight: 16,
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    warning: '#FFC107',
    success: '#4CAF50',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    ...baseFonts,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    warning: '#FFD54F',
    success: '#81C784',
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    ...baseFonts,
  },
};
