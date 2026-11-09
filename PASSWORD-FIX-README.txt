# Password compatibility fix

## What changed
- Login now accepts existing plain-text values in `07_MASTER_USER` column H for a one-time migration.
- On the first successful login, the API replaces that value in column H with a bcrypt hash (cost 12).
- Future logins use bcrypt comparison.
- Passwords are not trimmed or lowercased; type the exact password.
- The update writes only column H for the matching User_ID.

## Apply
1. Replace the old project folder with this fixed project (keep a backup first).
2. Configure `apps/api/.env` with your own Google service account and spreadsheet values.
3. Ensure the Google service account has **Editor** access to the spreadsheet, because the first successful login must update column H.
4. From the project root run:
   `npm install`
   `npm run build`
   `npm run dev:api`
   (For production, use `npm run build` then `npm start` in `apps/api`.)
5. Sign in once with the exact existing plain-text password. After successful login, column H should begin with `$2a$` or `$2b$`. Do not manually copy or share that hash.

## Important security action
The original ZIP included a Google service-account private key and JWT secret inside `apps/api/.env`. They have been removed from this fixed ZIP. Treat the credentials in the original ZIP as exposed: revoke/delete that service-account key in Google Cloud IAM and create a new key, then update your local `.env`. Also generate a new random JWT_SECRET (at least 32 characters). Never upload or commit `.env`.
