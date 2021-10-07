export default function parseDate(tdate) {
    const created = new Date(Date.parse(tdate));
    const now = new Date();
    const diff = Math.floor((now - created) / 1000);
    if (diff <= 1) {
      return '방금';
    }
    if (diff < 60) {
      return '1분 전';
    }
    
    if (diff <= 3540) {
      return Math.round(diff / 60) + ' 분 전';
    }
    if (diff <= 5400) {
      return '1 시간 전';
    }
    if (diff <= 86400) {
      return Math.round(diff / 3600) + ' 시간 전';
    }
    if (diff <= 129600) {
      return '1 일 전';
    }
    if (diff < 604800) {
      return Math.round(diff / 86400) + ' 일 전';
    }
    if (diff <= 777600) {
      return '1 주 전';
    }
    const month = created.toLocaleDateString('default', { month: 'long' });
    return ` ${month} ${created.getDate()}`;
  }
  