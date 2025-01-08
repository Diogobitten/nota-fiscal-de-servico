function calcularNotaFiscal() {
    const valorVenda = parseFloat(document.getElementById("valorVenda").value);
    const irpf = parseFloat(document.getElementById("irpf").value);
    const pis = parseFloat(document.getElementById("pis").value);
    const cofins = parseFloat(document.getElementById("cofins").value);
    const inss = parseFloat(document.getElementById("inss").value);
    const issqn = parseFloat(document.getElementById("issqn").value);
    const itens = document.getElementById("itens").value;
  
    if (isNaN(valorVenda) || valorVenda <= 0) {
      alert("Por favor, insira um valor de venda válido.");
      return;
    }
  
    // Calcular impostos
    const irpfValor = (irpf / 100) * valorVenda;
    const pisValor = (pis / 100) * valorVenda;
    const cofinsValor = (cofins / 100) * valorVenda;
    const inssValor = (inss / 100) * valorVenda;
    const issqnValor = (issqn / 100) * valorVenda;
  
    const totalImpostos = irpfValor + pisValor + cofinsValor + inssValor + issqnValor;
    const valorLiquido = valorVenda - totalImpostos;
  
    // Exibir Nota Fiscal
    const resultadoHTML = `
      <p><strong>Itens Vendidos:</strong> ${itens}</p>
      <p><strong>Valor da Venda:</strong> R$ ${valorVenda.toFixed(2)}</p>
      <p><strong>IRPF:</strong> R$ ${irpfValor.toFixed(2)}</p>
      <p><strong>PIS:</strong> R$ ${pisValor.toFixed(2)}</p>
      <p><strong>COFINS:</strong> R$ ${cofinsValor.toFixed(2)}</p>
      <p><strong>INSS:</strong> R$ ${inssValor.toFixed(2)}</p>
      <p><strong>ISSQN:</strong> R$ ${issqnValor.toFixed(2)}</p>
      <p><strong>Total de Impostos:</strong> R$ ${totalImpostos.toFixed(2)}</p>
      <p><strong>Valor Líquido:</strong> R$ ${valorLiquido.toFixed(2)}</p>
    `;
  
    document.getElementById("notaFiscalDados").innerHTML = resultadoHTML;
    document.getElementById("notaFiscalResultado").style.display = "block";
  
    // Salvar os dados para exportação
    window.dadosNotaFiscal = {
      itens,
      valorVenda: valorVenda.toFixed(2),
      irpfValor: irpfValor.toFixed(2),
      pisValor: pisValor.toFixed(2),
      cofinsValor: cofinsValor.toFixed(2),
      inssValor: inssValor.toFixed(2),
      issqnValor: issqnValor.toFixed(2),
      totalImpostos: totalImpostos.toFixed(2),
      valorLiquido: valorLiquido.toFixed(2),
    };
  }
  
  function exportarExcel() {
    if (!window.dadosNotaFiscal) {
      alert("Por favor, gere a Nota Fiscal antes de exportar.");
      return;
    }
  
    const ws = XLSX.utils.json_to_sheet([window.dadosNotaFiscal]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nota Fiscal");
  
    // Exportar o arquivo Excel
    XLSX.writeFile(wb, "nota_fiscal.xlsx");
  }
  
  function exportarXML() {
    if (!window.dadosNotaFiscal) {
      alert("Por favor, gere a Nota Fiscal antes de exportar.");
      return;
    }
  
    const dados = window.dadosNotaFiscal;
    const xml = `
      <notaFiscal>
        <itens>${dados.itens}</itens>
        <valorVenda>${dados.valorVenda}</valorVenda>
        <irpfValor>${dados.irpfValor}</irpfValor>
        <pisValor>${dados.pisValor}</pisValor>
        <cofinsValor>${dados.cofinsValor}</cofinsValor>
        <inssValor>${dados.inssValor}</inssValor>
        <issqnValor>${dados.issqnValor}</issqnValor>
        <totalImpostos>${dados.totalImpostos}</totalImpostos>
        <valorLiquido>${dados.valorLiquido}</valorLiquido>
      </notaFiscal>
    `.trim();
  
    const blob = new Blob([xml], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nota_fiscal.xml";
    link.click();
  }
  