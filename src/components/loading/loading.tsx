import { Pane, Spinner } from "evergreen-ui"
import { connect, RootStateOrAny } from "react-redux";

type props = {
  showSpinner: boolean
}

function Loading({ showSpinner }: props) {
  return (
    showSpinner
      ? <Pane position='absolute' width='100%' height='100%' backgroundColor='black' zIndex='999' opacity='0.4'>
           {showSpinner && <Spinner position='relative' top='50%' margin='auto' />}
         </Pane>
      : <Pane></Pane>
  )
}

const mapStateToProps = (state: RootStateOrAny) => {
  return {
      showSpinner: state.showSpinner
  }
}

export default connect(mapStateToProps)(Loading);