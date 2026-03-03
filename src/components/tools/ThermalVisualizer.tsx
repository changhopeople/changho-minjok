'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Thermometer, Sun, TrendingDown, Zap, ThermometerSun, Home, Flame, PiggyBank, TrendingUp } from 'lucide-react';

/* ───────── 온도 → 열화상 색상 매핑 ───────── */
function tempToColorSmooth(temp: number): string {
  // 더 세밀한 색상 보간
  const stops: [number, [number, number, number]][] = [
    [-20, [26, 10, 78]],
    [-5, [30, 58, 138]],
    [5, [8, 145, 178]],
    [12, [34, 197, 94]],
    [18, [234, 179, 8]],
    [20, [249, 115, 22]],
    [22, [239, 68, 68]],
  ];

  if (temp <= stops[0][0]) return `rgb(${stops[0][1].join(',')})`;
  if (temp >= stops[stops.length - 1][0]) return `rgb(${stops[stops.length - 1][1].join(',')})`;

  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (temp >= t0 && temp <= t1) {
      const ratio = (temp - t0) / (t1 - t0);
      const r = Math.round(c0[0] + (c1[0] - c0[0]) * ratio);
      const g = Math.round(c0[1] + (c1[1] - c0[1]) * ratio);
      const b = Math.round(c0[2] + (c1[2] - c0[2]) * ratio);
      return `rgb(${r},${g},${b})`;
    }
  }
  return '#ef4444';
}

/* ───────── ThermalPanel (내부 컴포넌트) ───────── */
function ThermalPanel({
  type,
  innerTemp,
  heatLoss,
  outdoorTemp,
}: {
  type: 'regular' | 'insulated';
  innerTemp: number;
  heatLoss: number;
  outdoorTemp: number;
}) {
  const glassColor = tempToColorSmooth(innerTemp);
  const wallColor = tempToColorSmooth(22);
  const outerColor = tempToColorSmooth(outdoorTemp);
  const isRegular = type === 'regular';

  // 일반 창호: 프레임 모서리 냉기 누출 표현
  const frameLeakColor = isRegular
    ? tempToColorSmooth(innerTemp - 4)
    : tempToColorSmooth(innerTemp + 1);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none">
      {/* 배경 열화상 그라디언트 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, ${glassColor} 0%, ${isRegular ? frameLeakColor : glassColor} 35%, ${wallColor} 70%, ${wallColor} 100%)
          `,
        }}
      />

      {/* 일반 창호: 모서리 냉기 누출 레이어 */}
      {isRegular && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 30% 25% at 20% 20%, ${outerColor}88 0%, transparent 70%),
                radial-gradient(ellipse 30% 25% at 80% 20%, ${outerColor}88 0%, transparent 70%),
                radial-gradient(ellipse 30% 25% at 20% 80%, ${outerColor}88 0%, transparent 70%),
                radial-gradient(ellipse 30% 25% at 80% 80%, ${outerColor}88 0%, transparent 70%)
              `,
            }}
          />
          {/* 열 유출 파티클 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: `${outerColor}cc`,
                left: `${15 + (i % 3) * 30}%`,
                top: `${20 + Math.floor(i / 3) * 50}%`,
              }}
              animate={{
                y: [0, -20, -40],
                x: [0, (i % 2 === 0 ? -10 : 10), (i % 2 === 0 ? -15 : 15)],
                opacity: [0.8, 0.4, 0],
                scale: [1, 1.5, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      {/* SVG 창문 프레임 오버레이 */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* 외곽 프레임 */}
        <rect
          x="40" y="30" width="320" height="240"
          rx="8"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="6"
          fill="none"
        />
        {/* 가로 중앙 */}
        <line
          x1="40" y1="150" x2="360" y2="150"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="4"
        />
        {/* 세로 중앙 */}
        <line
          x1="200" y1="30" x2="200" y2="270"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="4"
        />
      </svg>

      {/* 라벨 */}
      <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
        <span className="text-xs font-bold text-white">
          {isRegular ? '일반 창호' : '단열 창호'}
        </span>
      </div>

      {/* 온도 표시 */}
      <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
        <span
          className="text-sm font-extrabold"
          style={{ color: glassColor }}
        >
          유리면 {innerTemp.toFixed(1)}°C
        </span>
      </div>

      {/* 열손실 표시 */}
      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
        <span className="text-xs text-white">
          열손실 <span className="font-extrabold text-sm">{heatLoss.toFixed(0)}%</span>
        </span>
      </div>
    </div>
  );
}

/* ───────── 슬라이더 아이콘 ───────── */
function TempIcon({ temp }: { temp: number }) {
  if (temp <= -10) return <Snowflake className="w-5 h-5 text-blue-400" />;
  if (temp <= 0) return <Thermometer className="w-5 h-5 text-cyan-400" />;
  return <Sun className="w-5 h-5 text-yellow-400" />;
}

/* ───────── 금액 포맷 ───────── */
function formatWon(value: number): string {
  if (value >= 10000) return `${Math.round(value / 10000)}만원`;
  return `${value.toLocaleString()}원`;
}

/* ───────── 메인 컴포넌트 ───────── */
export default function ThermalVisualizer() {
  const [outdoorTemp, setOutdoorTemp] = useState(-5);
  const [area, setArea] = useState(30);
  const [activeTab, setActiveTab] = useState<'regular' | 'insulated'>('regular');

  const calc = useMemo(() => {
    const tempDiff = 22 - outdoorTemp;

    const regularHeatLoss = Math.min(95, 30 + tempDiff * 1.5);
    const regularInnerTemp = 22 - tempDiff * 0.4;

    const insulatedHeatLoss = Math.min(40, 8 + tempDiff * 0.5);
    const insulatedInnerTemp = 22 - tempDiff * 0.12;

    const energySaving = ((regularHeatLoss - insulatedHeatLoss) / regularHeatLoss) * 100;
    const heatLossReduction = regularHeatLoss - insulatedHeatLoss;
    const tempImprovement = insulatedInnerTemp - regularInnerTemp;

    // 비용 계산 (평당 월 5,000원 기본 난방단가)
    const baseCost = area * 5000;
    const regularMonthlyCost = Math.round(baseCost * (1 + (regularHeatLoss / 100) * 0.6));
    const insulatedMonthlyCost = Math.round(baseCost * (1 + (insulatedHeatLoss / 100) * 0.6));
    const monthlySaving = regularMonthlyCost - insulatedMonthlyCost;
    const annualSaving = monthlySaving * 5; // 겨울 5개월 기준
    const tenYearSaving = annualSaving * 10;

    return {
      regularHeatLoss,
      regularInnerTemp,
      insulatedHeatLoss,
      insulatedInnerTemp,
      energySaving,
      heatLossReduction,
      tempImprovement,
      regularMonthlyCost,
      insulatedMonthlyCost,
      monthlySaving,
      annualSaving,
      tenYearSaving,
    };
  }, [outdoorTemp, area]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* 열화상 패널 영역 */}
      {/* 데스크톱: 2열 그리드 */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-8">
        <ThermalPanel
          type="regular"
          innerTemp={calc.regularInnerTemp}
          heatLoss={calc.regularHeatLoss}
          outdoorTemp={outdoorTemp}
        />
        <ThermalPanel
          type="insulated"
          innerTemp={calc.insulatedInnerTemp}
          heatLoss={calc.insulatedHeatLoss}
          outdoorTemp={outdoorTemp}
        />
      </div>

      {/* 모바일: 탭 전환 */}
      <div className="lg:hidden mb-8">
        {/* 탭 버튼 */}
        <div className="flex mb-4 bg-white/10 rounded-xl p-1">
          {(['regular', 'insulated'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#1E1E1E]'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab === 'regular' ? '일반 창호' : '단열 창호'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'regular' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'regular' ? 20 : -20 }}
            transition={{ duration: 0.25 }}
          >
            <ThermalPanel
              type={activeTab}
              innerTemp={activeTab === 'regular' ? calc.regularInnerTemp : calc.insulatedInnerTemp}
              heatLoss={activeTab === 'regular' ? calc.regularHeatLoss : calc.insulatedHeatLoss}
              outdoorTemp={outdoorTemp}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 컨트롤 영역: 온도 + 평수 슬라이더 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* 온도 슬라이더 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TempIcon temp={outdoorTemp} />
              <span className="text-white font-bold">외부 온도</span>
            </div>
            <span className="text-2xl font-extrabold text-white">{outdoorTemp}°C</span>
          </div>

          <input
            type="range"
            min={-20}
            max={10}
            value={outdoorTemp}
            onChange={(e) => setOutdoorTemp(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1a0a4e, #1e3a8a, #0891b2, #22c55e, #eab308)`,
            }}
          />

          <div className="flex justify-between text-xs text-white/50 mt-2">
            <span>-20°C (한파)</span>
            <span>-10°C</span>
            <span>0°C</span>
            <span>10°C (봄)</span>
          </div>
        </div>

        {/* 평수 슬라이더 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-white/80" />
              <span className="text-white font-bold">집 평수</span>
            </div>
            <span className="text-2xl font-extrabold text-white">{area}<span className="text-base font-bold text-white/60 ml-1">평</span></span>
          </div>

          <input
            type="range"
            min={10}
            max={60}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer accent-[#EF4444]"
            style={{
              background: `linear-gradient(to right, #374151, #6b7280, #9ca3af)`,
            }}
          />

          <div className="flex justify-between text-xs text-white/50 mt-2">
            <span>10평</span>
            <span>25평</span>
            <span>40평</span>
            <span>60평</span>
          </div>
        </div>
      </div>

      {/* 하단 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.3 }}
          key={`loss-${Math.round(calc.heatLossReduction)}`}
        >
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingDown className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-xs text-white/50 mb-1">열손실률 감소</p>
          <p className="text-2xl font-extrabold text-white">
            -{calc.heatLossReduction.toFixed(0)}
            <span className="text-sm font-bold text-white/60 ml-1">%p</span>
          </p>
        </motion.div>

        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.3 }}
          key={`saving-${Math.round(calc.energySaving)}`}
        >
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-xs text-white/50 mb-1">에너지 절약</p>
          <p className="text-2xl font-extrabold text-white">
            {calc.energySaving.toFixed(0)}
            <span className="text-sm font-bold text-white/60 ml-1">%</span>
          </p>
        </motion.div>

        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.3 }}
          key={`temp-${Math.round(calc.tempImprovement)}`}
        >
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ThermometerSun className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-xs text-white/50 mb-1">유리면 온도차</p>
          <p className="text-2xl font-extrabold text-white">
            +{calc.tempImprovement.toFixed(1)}
            <span className="text-sm font-bold text-white/60 ml-1">°C</span>
          </p>
        </motion.div>
      </div>

      {/* 비용 비교 섹션 */}
      <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="text-white font-bold">월 난방비 비교</span>
          <span className="text-xs text-white/40 ml-auto">겨울철 기준</span>
        </div>

        {/* 비용 비교 바 */}
        <div className="space-y-4 mb-6">
          {/* 일반 창호 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">일반 창호</span>
              <span className="text-lg font-extrabold text-red-400">
                월 {formatWon(calc.regularMonthlyCost)}
              </span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                animate={{ width: `${Math.min(100, (calc.regularMonthlyCost / (60 * 5000 * 1.6)) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* 단열 창호 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">단열 창호</span>
              <span className="text-lg font-extrabold text-green-400">
                월 {formatWon(calc.insulatedMonthlyCost)}
              </span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                animate={{ width: `${Math.min(100, (calc.insulatedMonthlyCost / (60 * 5000 * 1.6)) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* 절약 금액 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <motion.div
            className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl p-4 text-center border border-orange-500/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
            key={`monthly-${calc.monthlySaving}`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <PiggyBank className="w-4 h-4 text-orange-400" />
              <p className="text-xs text-white/50">월 절약액</p>
            </div>
            <p className="text-xl font-extrabold text-orange-400">
              {formatWon(calc.monthlySaving)}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-4 text-center border border-green-500/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
            key={`annual-${calc.annualSaving}`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <p className="text-xs text-white/50">연간 절약액</p>
            </div>
            <p className="text-xl font-extrabold text-green-400">
              {formatWon(calc.annualSaving)}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-4 text-center border border-emerald-500/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
            key={`tenyear-${calc.tenYearSaving}`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <p className="text-xs text-white/50">10년 절약액</p>
            </div>
            <p className="text-xl font-extrabold text-emerald-400">
              {formatWon(calc.tenYearSaving)}
            </p>
          </motion.div>
        </div>

        {/* 임팩트 문구 */}
        <p className="text-center text-white/40 text-xs mt-4">
          * {area}평 기준, 겨울 5개월 난방 시 예상 절약액 (평당 월 5,000원 기본 난방단가 기준)
        </p>
      </div>
    </div>
  );
}
