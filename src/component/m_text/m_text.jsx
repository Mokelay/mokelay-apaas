/**
 *  Text
 * 
 * */
export default function M_Text({content, maxLine = 1, children}) {
	return (
		<span>
			{content}

			{children}
		</span>
	)
}