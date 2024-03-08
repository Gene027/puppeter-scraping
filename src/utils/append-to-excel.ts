import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { EzeProduct } from '@/keepa/interface/keepa.interface';
import { camelCaseToUserReadable, columnToLetter } from './string';

export async function appendToExcel(
  data: EzeProduct[] | Record<string, any>[],
  batchSize: number = 100,
) {
  const filePath = path.join(process.cwd(), 'war-engine.xlsx');
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);
  } catch (err) {
    console.log('File not found, creating a new one.');
    workbook.addWorksheet('War Engine');
  }

  const worksheet = workbook.getWorksheet('War Engine');
  const columns: string[] = Object.keys(data[0]);
  const userReadableColumns: string[] = columns.map((field) =>
    camelCaseToUserReadable(field),
  );

  if (worksheet.rowCount === 0) {
    userReadableColumns.forEach((column, index) => {
      const cellReference = `${columnToLetter(index + 1)}1`;
      worksheet.getCell(cellReference).value = column;
    });
  }

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    batch.forEach((product) => {
      const rowIndex = worksheet.lastRow.number + 1;
      columns.forEach((column, columnIdx) => {
        const cellReference = `${columnToLetter(columnIdx + 1)}${rowIndex}`;
        worksheet.getCell(cellReference).value = product[column];
      });
      worksheet.getRow(rowIndex).commit();
    });
  }

  await workbook.xlsx
    .writeFile(filePath)
    .then(() => {
      console.log('Excel file updated successfully.');
    })
    .catch((error) => {
      console.error('Error updating Excel file:', error);
    });
}
