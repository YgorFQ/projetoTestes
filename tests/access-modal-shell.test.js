const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const accessRegister = fs.readFileSync(path.join(root, 'app/features/access/register.js'), 'utf8');
const utilityMenu = fs.readFileSync(path.join(root, 'app/shell/scripts/senko-utility-menu.js'), 'utf8');
const accessCss = fs.readFileSync(path.join(root, 'app/features/access/styles/access.css'), 'utf8');

assert.match(accessRegister, /window\.SenkoAccessModal\s*=/, 'Acessos deve expor a API global do modal');
assert.doesNotMatch(accessRegister, /registerFeature\s*\(/, 'Acessos nao deve voltar a criar uma aba');
assert.match(accessRegister, /id = 'senkoAccessBtn'/, 'Acessos deve registrar sua acao global');
assert.match(utilityMenu, /senkoAccessBtn:\s*'Acessos'/, 'Menu deve rotular a acao Acessos');
assert.match(utilityMenu, /node\.id === 'senkoGlobalCreateBtn'/, 'Criacao rapida deve permanecer fora do menu');
assert.match(utilityMenu, /insertBefore\(quickCreate, trigger\)/, 'Criacao rapida deve ficar a esquerda do menu');
assert.match(accessCss, /\.senko-access-overlay/, 'Acessos deve possuir uma camada de modal');
assert.match(accessCss, /@media \(max-width: 760px\)/, 'Modal deve possuir tratamento responsivo');

console.log('Access modal shell tests passed.');
