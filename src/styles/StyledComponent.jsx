import { styled } from "@mui/material/styles";

//styles
export const Wrapper = styled('section')({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: '100px',
    // height: '100%',
});

export const InputWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20px',
    width: '50%',
    margin: 'auto'
});


export const OuterWrapper = styled('section')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: '100px',
    height: '100vh'
});

export const FormWrapper = styled('form')({
    paddingBottom: '20px'
});

export const BodyWrapper = styled('section')({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: '100px',
    height: '100vh'
});
