export type CardFormProps = {
    show: boolean;
    card: {
        _id?: string;
        src: string;
        title: string;
        description: string;
        show: boolean;
    };
    onClose: () => void;
    onChange: (field: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    uploading?: boolean;
    onImageUpload?: (file: File) => void;
};