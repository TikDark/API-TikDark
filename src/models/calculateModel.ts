export const calculateTotal = (likes: number, views: number, shares: number, saves: number, videos: number): number => {
    // Novos valores para cada métrica
    const likeCost = 0.002;  // R$0,002 por curtida
    const viewCost = 0.00006;  // R$0,00006 por visualização
    const shareCost = 0.0016;  // R$0,0016 por compartilhamento
    const saveCost = 0.002;  // R$0,002 por salvamento
    const videoCost = 2;  // Custo fixo por vídeo

    // Cálculo do total com as novas tarifas
    return (likes * likeCost + views * viewCost + shares * shareCost + saves * saveCost) * videos + videos * videoCost;
};
