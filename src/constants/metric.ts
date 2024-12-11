import { styles } from '@/utils/styles'

export const metrics = [
    { key: 'temperature', color: '#06b6d4', name: 'Temperature (°C)', dotClass: styles['tooltipDot--temperature'] },
    { key: 'humidity', color: '#8b5cf6', name: 'Humidity (%)', dotClass: styles['tooltipDot--humidity'] },
    { key: 'pm25', color: '#ef4444', name: 'PM2.5 (µg/m³)', dotClass: styles['tooltipDot--pm25'] },
    { key: 'voc', color: '#f59e0b', name: 'VOC (ppb)', dotClass: styles['tooltipDot--voc'] },
    { key: 'o3', color: '#10b981', name: 'O₃ (ppb)', dotClass: styles['tooltipDot--o3'] },
    { key: 'co', color: '#6366f1', name: 'CO (ppm)', dotClass: styles['tooltipDot--co'] },
    { key: 'co2', color: '#ec4899', name: 'CO₂ (ppm)', dotClass: styles['tooltipDot--co2'] },
    { key: 'no2', color: '#14b8a6', name: 'NO₂ (ppb)', dotClass: styles['tooltipDot--no2'] },
    { key: 'so2', color: '#f97316', name: 'SO₂ (ppb)', dotClass: styles['tooltipDot--so2'] }
] as const