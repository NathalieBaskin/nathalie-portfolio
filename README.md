# nathalie-portfolio

Praktiska instruktioner for att jobba har och byta dator utan att nagot saknas.

## Snabbstart (lokalt)

1. Klona repo:
```bash
git clone git@github-nathalieb:NathalieBaskin/nathalie-portfolio.git
```

2. Ga in i mappen:
```bash
cd nathalie-portfolio
```

3. Installera beroenden:
```bash
npm install
```

4. Starta dev-server:
```bash
npm run dev
```

Appen kor pa `http://localhost:3000`.

## Byta dator (sa att inget saknas)

### 1) Git-koden
All kod som ligger i Git foljer med automatiskt:
```bash
git add .
git commit -m "Sync"
git push
```

Pa nya datorn:
```bash
git clone git@github-nathalieb:NathalieBaskin/nathalie-portfolio.git
cd nathalie-portfolio
npm install
npm run dev
```

### 2) Bilder och video
Stora mediafiler ligger inte i Git. De hamtas via Cloudflare R2.

I koden anvands en publik bas-URL i `app/lib/media.js`:
```js
export const R2_BASE = "https://pub-ff3078a376e0426785394f30bba2fe21.r2.dev";
```

Det betyder:
- For att bara köra projektet lokalt behovs INGA nycklar.
- Du behovar nycklar endast om du vill ladda upp nya filer till R2 fran nya datorn.

### 3) R2-uppladdning (om du ska ladda upp media)

Installera rclone och skapa en R2-profil.

PowerShell (byt ut dina egna vardnen):
```powershell
rclone config create r2 s3 provider Cloudflare `
  access_key_id YOUR_ACCESS_KEY_ID `
  secret_access_key YOUR_SECRET_ACCESS_KEY `
  endpoint https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com `
  region auto no_check_bucket true

rclone copy "C:\path\to\nathalie-portfolio\public\fotografi" "r2:YOUR_BUCKET/fotografi" --s3-no-check-bucket
rclone copy "C:\path\to\nathalie-portfolio\public\videos" "r2:YOUR_BUCKET/videos" --s3-no-check-bucket
rclone copy "C:\path\to\nathalie-portfolio\public\hero.left.png" "r2:YOUR_BUCKET/hero.left.png" --s3-no-check-bucket
rclone copy "C:\path\to\nathalie-portfolio\public\hero.right.png" "r2:YOUR_BUCKET/hero.right.png" --s3-no-check-bucket
```

OBS: Lag aldrig in nycklar i repo eller README.

## Vanliga problem

- Saknade bilder lokalt: kontrollera att `R2_BASE` pekar pa ratt publik URL.
- Mediafiler i `public/` ar ignorerade av Git (de ligger i R2).
- Ingen `.env.local` i detta repo. Allt som behovs for lokal visning kommer via publik R2-URL.
