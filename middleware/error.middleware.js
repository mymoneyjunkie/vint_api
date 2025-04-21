const errorMiddleware = (err, req, res, next) => {
	try {
		let error = { ...err };

		error.message = err.message;

		return res.status(error.statusCode || 500)
			.json({ 
				isSuccess: false, 
				message: error.message || 'Server Error', 
				...err
			});
	}

	catch (error) {
		console.log(error);
		next(error);
	}
}

export default errorMiddleware;