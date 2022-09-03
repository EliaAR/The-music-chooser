interface GetLocalStorageProps<T> {
  key: string;
  defaultValue: T;
}
interface SetLocalStorageProps {
  key: string;
  value: any;
}

function GetLocalStorage<T>({ key, defaultValue }: GetLocalStorageProps<T>): T {
  const data = localStorage.getItem(key);
  if (data === null) {
    return defaultValue;
  } else {
    return JSON.parse(data) as T;
  }
}

function SetLocalStorage({ key, value }: SetLocalStorageProps) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { GetLocalStorage, SetLocalStorage };
