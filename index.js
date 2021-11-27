// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDifieMiGVgcKoKP6XQLkYu8sf2D7Z7lyE',
  authDomain: 'watchful-muse-258714.firebaseapp.com',
  databaseURL: 'https://watchful-muse-258714-default-rtdb.firebaseio.com',
  projectId: 'watchful-muse-258714',
  storageBucket: 'watchful-muse-258714.appspot.com',
  messagingSenderId: '67083904862',
  appId: '1:67083904862:web:c75e9434da6c9c806ed1cf',
  measurementId: 'G-CM42680GCJ',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
const colRef = collection(db, 'dishes')

// select the svg container first
const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600)

// create margins & dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 }
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

// create axes groups
const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`)

const yAxisGroup = graph.append('g')

getDocs(colRef).then((snapshot) => {
  // console.log(snapshot.docs)
  let data = []
  snapshot.docs.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  })
  // d3 part

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)])
    .range([graphHeight, 0])

  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, graphWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2)

  // join the data to circs
  const rects = graph.selectAll('rect').data(data)

  // add attrs to circs already in the DOM
  rects
    .attr('width', x.bandwidth)
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.orders))

  // append the enter selection to the DOM
  rects
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.orders))

  // create & call axesit
  const xAxis = d3.axisBottom(x)
  const yAxis = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat((d) => d + ' orders')

  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  xAxisGroup
    .selectAll('text')
    .attr('fill', 'orange')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
})
