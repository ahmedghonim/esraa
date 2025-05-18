-- AlterTable
ALTER TABLE "HeroSection" ADD COLUMN IF NOT EXISTS "thumbnail" TEXT NOT NULL DEFAULT '';

-- Update existing records with a default value if needed
UPDATE "HeroSection" SET "thumbnail" = '' WHERE "thumbnail" IS NULL; 