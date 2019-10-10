import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';

function AreSureMessage({ noClick, history }) {

	function handleCancelYes() {
		history.push('/dashboard')
	}

	function handleCancelNo() {
		window.location.reload()
	}

	return (
		<div className="sure">
			<p>Tem certeza que deseja cancelar?</p>
			<button onClick={handleCancelYes} className="yes">Sim</button>
			<button onClick={handleCancelNo} className="no">Não</button>
		</div>
	)
}

export default withRouter(AreSureMessage)