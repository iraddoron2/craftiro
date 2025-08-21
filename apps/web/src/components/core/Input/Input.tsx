import {
    Input as MuiBaseInput,
    InputProps as MuiInputProps,
} from '@mui/base/Input'

type InputProps = MuiInputProps & {
    className?: string
}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <MuiBaseInput
            slots={{
                root: 'div',
                input: 'input',
            }}
            slotProps={{
                root: {
                    className: `relative flex items-center w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
                      shadow-sm focus-within:ring-2 focus-within:ring-blue-500 
                      transition-all duration-200 hover:border-blue-400 
                      disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`,
                },
                input: {
                    className: `w-full bg-transparent outline-none placeholder-gray-400 text-gray-900`,
                },
            }}
            {...props}
        />
    )
}
