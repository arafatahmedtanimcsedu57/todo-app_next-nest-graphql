-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "priorityId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "public"."Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;
