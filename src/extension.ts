import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "remove-emojis" is now active!');

    // Register the emoji removal command
    const disposable = vscode.commands.registerCommand('remove-emojis.remove', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No file is open.');
            return;
        }

        const document = editor.document;
        const fullText = document.getText();

        // Regex to match most emojis
        const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g;
        const newText = fullText.replace(emojiRegex, '');

        // Replace entire document content with the emoji-free version
        const firstLine = document.lineAt(0);
        const lastLine = document.lineAt(document.lineCount - 1);
        const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

        editor.edit(editBuilder => {
            editBuilder.replace(textRange, newText);
        });

        vscode.window.showInformationMessage('Emojis removed!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}