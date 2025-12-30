/**
 * 提取 jsonlist 文件夹下所有 JSON 文件中的 aiTips 内容
 * 整合成数组保存到 jsonArr.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonlistDir = __dirname;
const outputFile = path.join(jsonlistDir, 'jsonArr.json');

// 读取目录下所有 .json 文件（排除输出文件）
const files = fs.readdirSync(jsonlistDir)
  .filter(file => file.endsWith('.json') && file !== 'jsonArr.json');

console.log(`找到 ${files.length} 个 JSON 文件`);

const allAiTips = [];

files.forEach((file, index) => {
  const filePath = path.join(jsonlistDir, file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 使用正则提取 aiTips 数组内容
    // 匹配 'aiTips': [...] 或 "aiTips": [...]
    const match = content.match(/['"]?aiTips['"]?\s*:\s*\[([\s\S]*?)\]/);
    
    if (match) {
      // 提取数组内容并解析
      const arrayContent = match[1].trim();
      
      if (arrayContent) {
        // 匹配所有字符串（单引号或双引号）
        const strings = arrayContent.match(/['"]([^'"]*)['"]/g);
        
        if (strings) {
          strings.forEach(str => {
            // 去掉引号
            const cleanStr = str.replace(/^['"]|['"]$/g, '');
            if (cleanStr) {
              allAiTips.push(cleanStr);
            }
          });
        }
      }
    }
    
    // 每处理100个文件打印一次进度
    if ((index + 1) % 100 === 0) {
      console.log(`已处理 ${index + 1}/${files.length} 个文件...`);
    }
  } catch (err) {
    console.error(`处理文件 ${file} 时出错:`, err.message);
  }
});

// 保存结果
const result = {
  total: allAiTips.length,
  aiTips: allAiTips
};

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');

console.log(`\n完成！共提取 ${allAiTips.length} 条 aiTips`);
console.log(`结果已保存到: ${outputFile}`);
