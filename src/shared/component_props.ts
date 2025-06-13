export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
}

export interface LoadingState {
    loading: boolean;
    error?: string;
}