export default interface ErrorRequest extends Error{
    statusCode?: number;
}