import jsPDF from 'jspdf';

export const generateTicketPDF = (ventaData, customerName) => {
  const doc = new jsPDF();
  
  // Configuración
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;
  
  // Header
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('LENNY', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Libros y Juegos de Mesa', pageWidth / 2, yPos, { align: 'center' });
  
  // Línea separadora
  yPos += 10;
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  // Información de la venta
  yPos += 10;
  doc.setFontSize(10);
  doc.text(`Ticket #${ventaData.id}`, margin, yPos);
  doc.text(`Fecha: ${new Date(ventaData.fecha).toLocaleString('es-AR')}`, pageWidth - margin, yPos, { align: 'right' });
  
  yPos += 7;
  doc.text(`Cliente: ${customerName}`, margin, yPos);
  
  // Línea separadora
  yPos += 7;
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  // Productos
  yPos += 10;
  doc.setFont(undefined, 'bold');
  doc.text('Productos:', margin, yPos);
  
  yPos += 7;
  doc.setFont(undefined, 'normal');
  
  ventaData.detalles.forEach((item) => {
    const tipo = item.tipoProducto === 'libro' ? '📚' : '🎲';
    const linea1 = `${tipo} ${item.nombreProducto}`;
    const linea2 = `   ${item.cantidad} x $${item.precioUnitario} = $${item.subtotal}`;
    
    doc.text(linea1, margin, yPos);
    yPos += 5;
    doc.text(linea2, margin, yPos);
    yPos += 7;
  });
  
  // Línea separadora
  yPos += 3;
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  // Total
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL:', margin, yPos);
  doc.text(`$${ventaData.precioTotal}`, pageWidth - margin, yPos, { align: 'right' });
  
  // Footer
  yPos += 20;
  doc.setFontSize(8);
  doc.setFont(undefined, 'italic');
  doc.text('¡Gracias por su compra!', pageWidth / 2, yPos, { align: 'center' });
  doc.text('Lenny - Tu tienda de libros y juegos de mesa', pageWidth / 2, yPos + 5, { align: 'center' });
  
  // Descargar
  doc.save(`ticket-${ventaData.id}.pdf`);
};