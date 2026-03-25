type ConsensusStateProps = {
  loading?: boolean;
  empty?: boolean;
  compact?: boolean;
};

export function ConsensusState({
  loading = false,
  empty = false,
  compact = false,
}: ConsensusStateProps) {
  if (loading) {
    return (
      <div className={`consensusState ${compact ? "consensusState--compact" : ""}`}>
        <div className="consensusState__shimmer" />
        <div className="consensusState__shimmer consensusState__shimmer--short" />
        <div className="consensusState__shimmer consensusState__shimmer--wide" />
        <p>Đang đọc consensus từ Stellar Testnet...</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className={`consensusState ${compact ? "consensusState--compact" : ""}`}>
        <div className="consensusState__pulse" />
        <h3>Chưa có vote on-chain</h3>
        <p>Hãy là người đầu tiên bỏ phiếu để khởi tạo consensus cho tin này.</p>
      </div>
    );
  }

  return null;
}
