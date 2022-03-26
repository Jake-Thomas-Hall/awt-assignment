export class ToastMessage {
    title?: string;
    content: string;
    style: string;
    timeout: number;

    constructor(options: ToastOptions) {
        this.title = options.title || undefined;
        this.timeout = options.timeout || 8000;
        this.content = options.content;
        this.style = options.style || 'info';
    }
}

export interface ToastOptions {
    content: string;
    title?: string;
    style?: string;
    timeout?: number;
}