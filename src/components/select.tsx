"use client"
import { useMemo } from "react"
import { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

type Props = {
    onChange: (value?: string) => void;
    options?: { label: string; value: string }[]
    value?: string | null | undefined
    disabled?: boolean
    placeholder?: string;
};

export const SelectForVariant = ({
    value,
    onChange,
    options,
    disabled,
    placeholder

}: Props) => {
    // const customStyles = {
    //     control: base => ({
    //       ...base,
    //       height: 35,
    //       minHeight: 35
    //     })
    //   };
    const onSelect = (options: SingleValue<{ label: string, value: string }>
    ) => {
        onChange(options?.value)
    }
    const formattedValue = useMemo(() => {
        return options?.find((option) => option.value === value)
    }, [options, value])
    return (
        <CreatableSelect
            placeholder={placeholder}
            className=" text-sm h-10  my-react-select-container  "
            classNamePrefix="my-react-select"
            value={formattedValue}
            onChange={onSelect}
            options={options}
            isDisabled={disabled}
            maxMenuHeight={100}
        />
    )
}