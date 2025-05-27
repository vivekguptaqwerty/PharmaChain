export {};

declare global {
  interface Window {
    recaptchaVerifier: any;
    firebaseUser: any;
  }
}
