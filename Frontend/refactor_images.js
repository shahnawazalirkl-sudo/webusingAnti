import { Project, SyntaxKind } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths("src/**/*.tsx");

const sourceFiles = project.getSourceFiles();
let updatedFilesCount = 0;

for (const sourceFile of sourceFiles) {
  let hasChanges = false;
  let hasImageImport = sourceFile.getImportDeclaration(decl => decl.getModuleSpecifierValue() === 'next/image');

  const jsxElements = [...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement), ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)];
  
  for (const element of jsxElements) {
    if (element.getTagNameNode().getText() === 'img') {
      element.getTagNameNode().replaceWithText('Image');
      
      if (element.getKind() === SyntaxKind.JsxOpeningElement) {
        const parentElement = element.getParentIfKind(SyntaxKind.JsxElement);
        if (parentElement) {
          parentElement.getClosingElement().getTagNameNode().replaceWithText('Image');
        }
      }

      // Add 'fill' if not present
      if (!element.getAttribute('fill')) {
        element.addAttribute({ name: 'fill' });
      }

      // Add 'loading="lazy"' if not present and not priority
      if (!element.getAttribute('loading') && !element.getAttribute('priority')) {
        element.addAttribute({ name: 'loading', initializer: '"lazy"' });
      }
      
      // Add 'sizes="(max-width: 768px) 100vw, 50vw"' if not present
      if (!element.getAttribute('sizes')) {
        element.addAttribute({ name: 'sizes', initializer: '"(max-width: 768px) 100vw, 50vw"' });
      }

      // Find the immediate parent JSX element and add 'relative' to its className if missing
      let parent = element.getParent();
      // If it's SelfClosingElement, parent is JsxElement or JsxFragment etc.
      // If it's OpeningElement, parent is JsxElement, its parent is another JsxElement/Fragment
      if (element.getKind() === SyntaxKind.JsxOpeningElement) {
        parent = parent.getParent();
      }
      
      if (parent && parent.getKind() === SyntaxKind.JsxElement) {
        const parentOpening = parent.getOpeningElement();
        const classNameAttr = parentOpening.getAttribute('className');
        
        if (classNameAttr) {
          if (classNameAttr.getKind() === SyntaxKind.JsxAttribute) {
            const initializer = classNameAttr.getInitializer();
            if (initializer && initializer.getKind() === SyntaxKind.StringLiteral) {
              const val = initializer.getLiteralValue();
              if (!val.includes('relative') && !val.includes('absolute')) {
                initializer.replaceWithText(`"${val} relative"`);
              }
            } else if (initializer && initializer.getKind() === SyntaxKind.JsxExpression) {
              const expr = initializer.getExpression();
              if (expr && expr.getKind() === SyntaxKind.TemplateExpression) {
                // e.g. className={`foo ${bar}`}
                const text = expr.getText();
                if (!text.includes('relative') && !text.includes('absolute')) {
                  expr.replaceWithText(`\`\${${text}} relative\``);
                }
              }
            }
          }
        } else {
          // No className attr, add one
          parentOpening.addAttribute({ name: 'className', initializer: '"relative"' });
        }
      }

      hasChanges = true;
    }
  }

  if (hasChanges) {
    if (!hasImageImport) {
      sourceFile.insertImportDeclaration(0, {
        defaultImport: 'Image',
        moduleSpecifier: 'next/image'
      });
    }
    sourceFile.saveSync();
    updatedFilesCount++;
    console.log(`Updated ${sourceFile.getFilePath()}`);
  }
}

console.log(`Finished updating ${updatedFilesCount} files.`);
