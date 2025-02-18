import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

function FileInput({ file, setFile, formRef, check, btnLoading }) {

    const warn = (filename) => toast.warning(`Rejected: ${filename}`)

    const rejectIcon = file => {

        if (file.type === "image/x-icon") {
            return {
                code: "blacklisted-ico-file-type",
                message: `icon files are not allowed`
            };
        }
        else if (file.type === "image/svg+xml") {
            return {
                code: "blacklisted-svg-file-type",
                message: `svg vector files are not allowed`
            };
        }
    }

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

        if (acceptedFiles.length > 0) {
            acceptedFiles[0].previewUrl = URL.createObjectURL(acceptedFiles[0])
            setFile(prev => ({ ...prev, image: acceptedFiles[0] }))
        }
        if (rejectedFiles) {

            if (acceptedFiles.length === 0) {
                const rejected1 = rejectedFiles.find(file => {
                    if (/image\/.*/.test(file.file.type)) {
                        if (file.file.type === "image/svg+xml" || file.file.type === "image/x-icon") return false
                        file.file.previewUrl = URL.createObjectURL(file.file)
                        return true
                    }
                });
                setFile(prev => ({ ...prev, image: rejected1.file }))
            }

            rejectedFiles.forEach((file, idx) => {
                setTimeout(() => {
                    warn(file.file.name)
                }, idx * 500);
            });
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
        disabled: btnLoading === "loading",
        validator: rejectIcon
    })

    if (file.active) {
        const image = formRef.current.image;

        if (file.image) {
            image.parentElement.style.border = "1px dashed var(--color-success)";
            check.current.imageAlright = true;
        }
        else {
            image.parentElement.style.border = "1px dashed var(--color-error)";
            check.current.imageAlright = false;
        }

    }

    return (
        <div {...getRootProps({
            className: `border border-primary border-dashed p-[10px] rounded-sm focus:outline-none focus:border-solid text-center line-clamp-1 ${btnLoading === "loading" ? "cursor-not-allowed" : "cursor-pointer"}`
        })} onFocus={() => setFile(prev => ({ ...prev, active: true }))}>
            <input {...getInputProps()} name='image' />
            {
                file?.image ? <p>{file.image.name}</p> : isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p><span className='max-sm:hidden'>Drag 'n' drop a image here, or</span> click to select a image</p>
            }
        </div>
    )
}

export default FileInput