import { useUser } from "../Context/useUser";


export type StorageUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB';


export interface StorageConverterFnType {
    value: number;
    from: StorageUnit;
    to: StorageUnit;

}


function useStorageUtils() {

    const { consumedStorage, allocatedStorage } = useUser();

    function convertBtwStorageUnits({
        value,
        from,
        to,
    }: StorageConverterFnType) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const fromIndex = units.indexOf(from);
        const toIndex = units.indexOf(to);
        if (fromIndex === -1 || toIndex === -1) {
            throw new Error('Invalid storage unit');
        }
        return value * (1000 ** (fromIndex - toIndex));
    }

    function formatFileSize(sizeInByte: number) {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", 'PB'];
        if (sizeInByte === 0) return "0 Byte";
        const i = Math.floor(Math.log(sizeInByte) / Math.log(1000));
        return `${(sizeInByte / 1000 ** i).toFixed(1)} ${sizes[i]}`;
    }

    function canIUseStorage(sizeInByte: number) {

        if (consumedStorage + sizeInByte > allocatedStorage) {
            return false;
        }
        return true;


    }




    return {
        convertBtwStorageUnits,
        formatFileSize,
        canIUseStorage,
    };

}



export default useStorageUtils;