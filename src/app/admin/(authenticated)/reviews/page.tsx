import { getAllReviews, getReviewStats } from '@/lib/review-db';
import ReviewManager from './ReviewManager';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const [reviews, stats] = await Promise.all([
    getAllReviews(),
    getReviewStats(),
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">후기/리뷰 관리</h1>
        <p className="text-gray-500 mt-1">고객 후기를 관리하고 승인합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">전체</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-[#E0F7F6] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#2AC1BC]">승인됨</p>
          <p className="text-2xl font-bold text-[#2AC1BC]">{stats.approved}</p>
        </div>
        <div className="bg-[#FFF3E8] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#FF6F0F]">대기중</p>
          <p className="text-2xl font-bold text-[#FF6F0F]">{stats.pending}</p>
        </div>
        <div className="bg-[#FFF3E8] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#FF6F0F]">평균 평점</p>
          <p className="text-2xl font-bold text-[#FF6F0F]">{stats.avgRating} / 5</p>
        </div>
      </div>

      <ReviewManager initialReviews={reviews} />
    </div>
  );
}
