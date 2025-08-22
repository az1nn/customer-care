function formatCnpj(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}

export default formatCnpj;
