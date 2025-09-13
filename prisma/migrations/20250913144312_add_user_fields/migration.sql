-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "completedPastPapers" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "todoPastPapers" TEXT[] DEFAULT ARRAY[]::TEXT[];
