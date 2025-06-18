export type CardFormProps = {
    show: boolean;
    card: {
        src: string;
        title: string;
        description: string;
    };
    onClose: () => void;
    onChange: (field: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    uploading?: boolean;
    onImageUpload?: (file: File) => void;
};