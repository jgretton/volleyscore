import React from "react";

const Scoresheet = () => {
	return (
		// full container
		<div className="min-w-screen">
			{/* Top section wrapper*/}
			<div className="grid grid-cols-5">
				<div className="grid col-span-3 grid-cols-5 border-2 border-black ">
					<div className="col-span-5 p-2 border-b ">
						<p className="font-bold text-lg"> Name of the Competition:</p>
					</div>

					<div className="col-span-5">
						<div className="col-span-3">
							<div className="">City:</div>
							<div className="">Country Code:</div>
							<div className="">Hall:</div>
							<div className="">Pool/Phase:</div>
							<div className="col-span-5 border-t border grid-cols-5">
								<div className="cols-span-3">
									<p>Division: </p>
								</div>
							</div>
						</div>
						<div className="col-span-2"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Scoresheet;
